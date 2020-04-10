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

    this.setState(prevState => ({
      days: [...prevState.days, {
        date: this.formattedDate(this.nextDate(lastDay.date)),
        quantity: lastDay.quantity,
        dietaryRequirements: lastDay.dietaryRequirements,
      }]
    }))
  }

  addDietaryRequirement(index) {
    let day = { ...this.state.days[index] }

    let reqs = Object.assign([], day.dietaryRequirements)

    reqs.push(
      {
        percentage: "0",
        option: null,
      }
    )
    day.dietaryRequirements = reqs

    let days = [...this.state.days]
    days[index] = day
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

  nextDate(date) {
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
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
                index={index}
                quantity={day.quantity}
                updatePercentage={this.updatePercentage}
                updateQuantity={this.updateQuantity}
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
