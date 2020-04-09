import React from 'react';
import PropTypes from 'prop-types';
import OrderDay from './order_day';

export default class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      days: [
        {
          date: this.formattedDate(new Date()),
          dietaryRequirements: [],
          quantity: "0",
        }
      ]
    }

    this.addAnotherDay = this.addAnotherDay.bind(this)
    this.addDietaryRequirement = this.addDietaryRequirement.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.updatePercentage = this.updatePercentage.bind(this)
  }

  formattedDate(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10);
  }

  addAnotherDay(e) {
    e.target.className = `${e.target.className} hidden`

    let days = this.state.days

    const lastDay = days.slice(-1).pop()

    days.push(
      {
        date: this.formattedDate(this.nextDate(days.length, lastDay.date)),
        quantity: lastDay.quantity,
        dietaryRequirements: lastDay.dietaryRequirements,
      }
    )

    this.setState({ days: days })
  }

  addDietaryRequirement(index) {
    let day = this.state.days[index]
    let existingRequirements = day.dietaryRequirements

    existingRequirements.push(
      {
        percentage: "0",
        option: null,
      }
    )

    let days = this.state.days
    days[index] = {
      ...day,
      dietaryRequirements: existingRequirements,
    }
    this.setState({ days: days })
  }

  updatePercentage(dayIndex, dietaryReqIndex, percentage) {
    let day = this.state.days[dayIndex]
    let dietaryReq = day.dietaryRequirements[dietaryReqIndex]

    dietaryReq.percentage = percentage

    day.dietaryRequirements[dietaryReqIndex] = dietaryReq
    let days = this.state.days

    days[dayIndex] = {
      ...day,
    }

    this.setState({
      days: days
    })
  }


  updateQuantity(index, quantity) {
    let day = this.state.days[index]

    day.quantity = quantity

    let days = this.state.days
    days[index] = day

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
            return <li key={index} className="mt-4">
              <OrderDay
                addAnotherDay={this.addAnotherDay}
                addDietaryRequirement={this.addDietaryRequirement}
                date={day.date}
                dietaryRequirements={day.dietaryRequirements}
                quantity={day.quantity}
                index={index}
                updateQuantity={this.updateQuantity}
                updatePercentage={this.updatePercentage}
              />
            </li>
          })
          }
        </ul>
      </React.Fragment>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string,
}
