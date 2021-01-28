const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../')

chai.use(chaiHttp);

const { expect } = chai;


describe('Integration Tests', () => {
  it('Should successfully return my profile', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        expect(res.body).to.have.property('data');
        expect(res.body.message).eql('My Rule-Validation API');
        expect(res.body.data.name).eql('Abioye Oyetunji');
        done();
      });
  });
  it('Should successfully return an error when rule field is not provided', (done) => {
    const data = {
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('rule is required.');
        done();
      });
  });
  it('Should successfully return an error when data field is not provided', (done) => {
    const data = {
      "rule": {
        "field": "0",
        "condition": "eq",
        "condition_value": "d"
      }
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('data is required.');
        done();
      });
  });
  it('Should successfully return an error when "rule field" field is not provided', (done) => {
    const data = {
      "rule": {
        "condition": "eq",
        "condition_value": "d"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('field is required.');
        done();
      });
  });
  it('Should successfully return an error when rule condition field is not provided', (done) => {
    const data = {
      "rule": {
        "field": "0",
        "condition_value": "d"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('condition is required.');
        done();
      });
  });
  it('Should successfully return an error when rule condition_value field is not provided', (done) => {
    const data = {
      "rule": {
        "field": "0",
        "condition": "eq"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('condition_value is required.');
        done();
      });
  });
  it('Should successfully return an error when a wrong type is supplied for data field', (done) => {
    const data = {
      "rule": {
        "field": "0",
        "condition": "eq",
        "condition_value": "d"
      },
      "data": 1
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('data should be a string, array or object.');
        done();
      });
  });
  it('Should successfully return an error when a wrong enum type is supplied for rule condition field', (done) => {
    const data = {
      "rule": {
        "field": "0",
        "condition": "cat",
        "condition_value": "d"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('condition must be one of [eq, neq, gt, gte, contains].');
        done();
      });
  });
  it('Should successfully return an error when a wrong type is supplied for "rule field" field', (done) => {
    const data = {
      "rule": {
        "field": 0,
        "condition": "eq",
        "condition_value": "d"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('field should be a string.');
        done();
      });
  });
  it('Should successfully return an error when a wrong type is supplied for rule field', (done) => {
    const data = {
      "rule": "rule",
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('rule should be an object.');
        done();
      });
  });
  it('Should successfully return success for string validation when valid', (done) => {
    const data = {
      "rule": {
        "field": "0",
        "condition": "eq",
        "condition_value": "d"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(false);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(data.data[data.rule.field]);
        done();
      });
  });
  it('Should successfully return an error when string validation is not valid', (done) => {
    const data = {
      "rule": {
        "field": "0",
        "condition": "eq",
        "condition_value": "a"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(true);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(data.data[data.rule.field]);
        done();
      });
  });
  it('Should successfully return an error when string field is not correct', (done) => {
    const data = {
      "rule": {
        "field": "20",
        "condition": "eq",
        "condition_value": "a"
      },
      "data": "damien-marley"
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('field 20 is missing from data.');
        done();
      });
  });
  it('Should successfully return success for array validation when valid', (done) => {
    const data = {
      "rule": {
        "field": "3",
        "condition": "contains",
        "condition_value": "rocinante"
      },
      "data": ["The Nauvoo", "The Razorback", "The Roci", "Tyrocinantecho"]
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(false);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(data.data[data.rule.field]);
        done();
      });
  });
  it('Should successfully return an error when array validation is not valid', (done) => {
    const data = {
      "rule": {
        "field": "3",
        "condition": "contains",
        "condition_value": "rocinante"
      },
      "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(true);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(data.data[data.rule.field]);
        done();
      });
  });
  it('Should successfully return an error when array field is not present', (done) => {
    const data = {
      "rule": {
        "field": "6",
        "condition": "contains",
        "condition_value": "rocinante"
      },
      "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('field 6 is missing from data.');
        done();
      });
  });
  it('Should successfully return success for single level object validation when valid', (done) => {
    const data = {
      "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
      }
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(false);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(data.data[data.rule.field]);
        done();
      });
  });
  it('Should successfully return an error when single level object validation is not valid', (done) => {
    const data = {
      "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 40
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 25
      }
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(true);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(data.data[data.rule.field]);
        done();
      });
  });
  it('Should successfully return an error when single level object field is missing', (done) => {
    const data = {
      "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 40
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
      }
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('field missions is missing from data.');
        done();
      });
  });
  it('Should successfully return success for nested level object validation when valid', (done) => {
    const data = {
      "rule": {
        "field": "missions.count",
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": {
          "count": 45,
          "successful": 44,
          "failed": 1
        }
      }
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(false);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(45);
        done();
      });
  });
  it('Should successfully return an error when nested level object validation is not valid', (done) => {
    const data = {
      "rule": {
        "field": "missions.count",
        "condition": "gte",
        "condition_value": 60
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": {
          "count": 45,
          "successful": 44,
          "failed": 1
        }
      }
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('validation');
        expect(res.body.data.validation.error).eql(true);
        expect(res.body.data.validation.field).eql(data.rule.field);
        expect(res.body.data.validation.field_value).eql(45);
        done();
      });
  });
  it('Should successfully return an error when nested level object field is missing', (done) => {
    const data = {
      "rule": {
        "field": "missions.count",
        "condition": "gte",
        "condition_value": 60
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": {
          "successful": 44,
          "failed": 1
        }
      }
    }
    chai
      .request(app)
      .post('/validate-rule')
      .send(data)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('data');
        expect(res.body.data).eql(null);
        expect(res.body.message).eql('field missions.count is missing from data.');
        done();
      });
  });
});
