window.ee = new EventEmitter();
var allReviews = [
  {
    author: "Самуил",
    date: "13 октября 2011",
    text: "Привет, Верунь! ниче себе ты крутая. фотка класс!!!!"
  },
  {
    author: "Лилия Семёновна",
    date: "14 октября 2011",
    text: "Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент, это и есть всемирно известный центр огранки алмазов и торговли бриллиантами?"
  },
  {
    author: "Лилия Семёновна",
    date: "14 октября 2011",
    text: "Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент?"
  }
];

function giveMeDate(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  if (month == 0) {
    month = 'Января'
  }else if (month == 1) {
    month = 'Февраля'
  }else if (month == 2) {
    month = 'Марта'
  }else if (month == 3) {
    month = 'Апреля'
  }else if (month == 4) {
    month = 'Мая'
  }else if (month == 5) {
    month = 'Июня'
  }else if (month == 6) {
    month = 'Июля'
  }else if (month == 7) {
    month = 'Августа'
  }else if (month == 8) {
    month = 'Сентября'
  }else if (month == 9) {
    month = 'Октября'
  }else if (month == 10) {
    month = 'Ноября'
  }else if (month == 11) {
    month = 'Декабря'
  }
  var d = day+' '+month+' '+year;
 return d
  }




var ReviewsHeader = React.createClass({
  render: function() {
    return (
      <section className="consultant-reviews-header">
        <div className="consultant-reviews-header__title">Последние отзывы
          <span><a href="#" className="reviews_link">Все отзывы</a></span>
        </div>
        <div className="consultant-reviews-header-buttons">
          <span className="like_button consultant-reviews-header-buttons__button">131</span>
          <span className="comments_button consultant-reviews-header-buttons__button">{this.props.rev.length}</span>
        </div>
      </section>
    )
  }
})

var Reviews = React.createClass({
  render: function() {
    var data = this.props.data;
    var reviewsTemplate;
      if(data.length>0) {
        reviewsTemplate = data.map(function(item,index) {
          return (
            <div key={index} className="review-block">
              <div className="review-block__author">{item.author}
                <span className="review-block__date">{item.date}</span>
              </div>
              <div className="review-block__text">{item.text}</div>
            </div>
          );
        });
      } else {
        reviewsTemplate = <p> Пока нет отзывов </p>
      }
      return (
        <section className="consultant-reviews__content">
          {reviewsTemplate}
        </section>
      );
  }
});

var ReviewsForm = React.createClass({
  getInitialState: function() {
    return {
      textAreaValue: '',
      emptyText: true
    };
  },
  onChangeHandler: function(e) {
    this.setState({textAreaValue: e.target.value})
    if(e.target.value.trim().length>0) {
      this.setState({emptyText: false})
    } else {
      this.setState({emptyText: true})
    }
  },
  onButtonClick: function(e) {
    e.preventDefault();
    var author = "Аноним";
    var text = this.state.textAreaValue;
    var d = new Date();
    var date = giveMeDate(d);


    var item = [
      {
        author: author,
        text: text,
        date: date
      }
    ];


    window.ee.emit('Reviews.add', item);
    this.setState({textAreaValue: ''});
    this.setState({emptyText: true});
  },
  render: function() {
    var textIsEmpty = this.state.emptyText;
    return (
      <section className="consultant-reviews__form">
        <form action="" className="reviews-form">
          <p className="reviews-form__textarea-block">
            <textarea
              name="question"
              className="reviews-form__textarea"
              value={this.state.textAreaValue}
              onChange={this.onChangeHandler}
            >
            </textarea>
          </p>
          <p className="reviews-form__submit-block">
            <button
              className="reviews-form__submit-button"
              onClick = {this.onButtonClick}
              disabled = {textIsEmpty}
              >Написать консультанту</button>
          </p>
        </form>
      </section>
    );
  }
})



var App = React.createClass({
  getInitialState: function() {
    return {
      reviews: allReviews
    }
  },
  componentDidMount: function() {
    var self = this;
    window.ee.addListener('Reviews.add', function(item) {
      var nextReview = item.concat(self.state.reviews);
      self.setState({reviews: nextReview});
    })
  },
  componentWillMount: function() {
    window.ee.removeListener('Reviews.add');
  },
  render: function() {
    return (
      <section className="consultant-reviews">
        <ReviewsHeader rev={this.state.reviews}/>
        <Reviews data={this.state.reviews} />
        <ReviewsForm/>
      </section>
    );
  }
});




ReactDOM.render(
  <App />,
  document.getElementById('root')
);
