import React from 'react';
import OrderDay from './order_day';

export default class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      days: [
        {
          date: this.formattedDate(new Date())
        }
      ]
    }

    this.addAnotherDay = this.addAnotherDay.bind(this)
  }

  formattedDate(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10);
  }

  addAnotherDay(e) {
    e.target.className = `${e.target.className} hidden`

    let days = this.state.days

    const lastDay = this.state.days.slice(-1).pop().date

    days.push(
      {
        date: this.formattedDate(this.nextDate(days.length, lastDay))
      }
    )

    console.log('clicked')

    this.setState({ days: days })
  }

  nextDate(days, date) {
    const result = new Date(date);
    console.log(result)
    result.setDate(result.getDate() + days);
    return result;
  }
  render() {
    return (
      <React.Fragment>
        <h2 className="text-4xl mt-5">Ordering for {this.props.name}</h2>
        <ul>
          {this.state.days.map((day, index) => {
            return <li key={index} className="mt-4"><OrderDay date={day.date} addAnotherDay={this.addAnotherDay} /></li>
          })
          }
        </ul>
      </React.Fragment>
    );
  }
}
