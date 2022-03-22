const one = 1;
const five = 5;
const minute = 60000;

class Magazine {
  constructor() {
    this.ReadyForPushNotification = true;
    this.ReadyForApprove = false;
    this.ReadyForPublish = false;
    this.PublishInProgress = false;

    this.staff = [];
    this.articles = [];
    this.followers = [];
  }
}

class Staff {
  constructor(name, typesEmployee, magazine) {
    this.name = name;
    this.typesEmployee = typesEmployee;
    this.magazine = magazine;

    this.magazine.staff.push(this.typesEmployee);
  }

  approve() {
    if (
      this.magazine.typesEmployee === 'manager' &&
      this.magazine.ReadyForApprove
    ) {
      console.log(`Hello ${this.name}. You've approved the changes`);

      this.magazine.ReadyForApprove = false;
      this.magazine.ReadyForPublish = true;
    } else if (this.magazine.ReadyForPushNotification) {
      console.log(
        `Hello ${this.name}. You can't approve. We don't have enough of publications.`
      );
    } else if (this.magazine.ReadyForPublish) {
      console.log(
        `Hello ${this.name}. Publications have been already approved by you.`
      );
    } else if (this.magazine.PublishInProgress) {
      console.log(
        `Hello ${this.name}. While we are publishing we can't do any actions`
      );
    } else {
      console.log('you do not have permissions to do it');
    }
  }

  addArticle(article) {
    if (this.typesEmployee !== 'manager') {
      this.magazine.articles.push(article);
    }

    if (this.magazine.articles.length >= five) {
      this.magazine.ReadyForPushNotification = false;
      this.magazine.ReadyForApprove = true;
    }
  }

  publish() {
    if (this.magazine.ReadyForPublish) {
      console.log(
        `Hello ${this.name}. You've recently published publications.`
      );

      this.magazine.ReadyForPublish = false;
      this.magazine.PublishInProgress = true;

      setTimeout(() => {
        this.ReadyForPushNotification = true;
        this.PublishInProgress = false;
        this.magazine.articles = [];

        console.log(this.magazine);
      }, minute);
    } else if (this.magazine.ReadyForPushNotification) {
      console.log(
        `Hello ${this.name}. You can't publish. We are creating publications now.`
      );
    } else if (this.magazine.ReadyForApprove) {
      console.log(
        `Hello ${this.name} You can't publish. We don't have a manager's approval.`
      );
    } else if (this.magazine.PublishInProgress) {
      console.log(
        `Hello ${this.name}. While we are publishing we can't do any actions.`
      );
    } else {
      console.log('you do not have permissions to do it');
    }
  }
}

class Followers {
  constructor(name) {
    this.name = name;
  }

  subscribeTo(magazine, topic) {
    this.magazine = magazine;
    this.topic = topic;

    this.magazine.followers.push(this);
  }

  unsubscribe() {
    const index = this.magazine.followers.indexOf(this);

    if (index !== -one) {
      this.magazine.followers.splice(index, 1);
    }
  }

  onUpdate(data) {
    this.data = data;
  }
}
