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
      )
  }
})






var App = React.createClass({
  render: function() {
    return (
        <Reviews data={allReviews}/>
    );
  }
});









ReactDOM.render(
  <App />,
  document.getElementById('root')
);
