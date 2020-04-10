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
          contact: {
            name: "",
            number: "",
          }
        }
      ]
    }

    this.addAnotherDay = this.addAnotherDay.bind(this)
    this.addDietaryRequirement = this.addDietaryRequirement.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.updatePercentage = this.updatePercentage.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateContactName = this.updateContactName.bind(this)
    this.updateContactNumber = this.updateContactNumber.bind(this)
  }

  formattedDate(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10);
  }

  addAnotherDay(e) {
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

  updateDate(index, newDate) {
    let day = this.state.days[index]

    day.date = this.formattedDate(new Date(newDate))

    let days = this.state.days
    days[index] = day

    this.setState({ days: days })
  }

  updateContactName(index, newName) {
    let day = this.state.days[index]

    day.contact.name = newName

    let days = this.state.days
    days[index] = day

    this.setState({ days: days })
  }

  updateContactNumber(index, newNumber) {
    let day = this.state.days[index]

    day.contact.number = newNumber

    let days = this.state.days
    days[index] = day

    this.setState({ days: days })
  }

  render() {
    return (
      <React.Fragment>
        <div className="mb-3">
          <h2 className="text-4xl mt-5 float-left">Ordering for {this.props.name}</h2>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm bl float-right mt-10" onClick={this.addAnotherDay}>Add another day</button>
          <div className="clearfix"></div>
        </div>
        <ul className="clear-both">
          {this.state.days.map((day, index) => {
            return <li key={index} className="mt-4">
              <OrderDay
                addAnotherDay={this.addAnotherDay}
                addDietaryRequirement={this.addDietaryRequirement}
                contact={day.contact}
                date={day.date}
                dietaryRequirements={day.dietaryRequirements}
                index={index}
                quantity={day.quantity}
                updateContactName={this.updateContactName}
                updateContactNumber={this.updateContactNumber}
                updateDate={this.updateDate}
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
