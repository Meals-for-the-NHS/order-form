import React from "react";
import PropTypes from "prop-types"
import DietaryRequirement from "./dietary_requirement";

export default class OrderDay extends React.Component {
  constructor() {
    super()

    this.addDietaryRequirementClick = this.addDietaryRequirementClick.bind(this)
    this.updateQuantityChange = this.updateQuantityChange.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateContactName = this.updateContactName.bind(this)
  }

  addDietaryRequirementClick(e) {
    e.target.remove()
    this.props.addDietaryRequirement(this.props.index)
  }

  updateQuantityChange(e) {
    this.props.updateQuantity(this.props.index, e.target.value)
  }

  updateDate(e) {
    this.props.updateDate(this.props.index, e.target.value)
  }

  updateContactName(e) {
    this.props.updateContactName(this.props.index, e.target.value)
  }

  render() {
    return (
      <React.Fragment>
        <div className="border-blue-300 border-b-2 pb-3">
          <div>
            Order
          <input
              type="number"
              name="quantity"
              min="0"
              defaultValue={this.props.quantity}
              className="w-16 text-right ml-2 mr-2 border-blue-300 border-2 rounded-md focus:outline-none focus:border-blue-600"
              onChange={this.updateQuantityChange}
            />
          meals for
          <input
              className="ml-3 border-blue-300 border-2 rounded-md focus:outline-none focus:border-blue-600"
              defaultValue={this.props.date}
              onChange={this.updateDate}
              type="date"
            />
            <div className="float-right">
              {this.props.dietaryRequirements &&
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm" onClick={this.addDietaryRequirementClick}>
                  Add dietary requirements
              </button>
              }
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="contact_name">Contact name:</label>
            <input
              className="w-auto ml-2 mr-2 border-blue-300 border-2 rounded-md focus:outline-none focus:border-blue-600"
              type="string"
              name="contact_name"
              defaultValue={this.props.contact.name}
              onChange={this.updateContactName}
            />
            <label htmlFor="contact_number">Contact number:</label>
            <input
              className="w-auto ml-2 mr-2 border-blue-300 border-2 rounded-md focus:outline-none focus:border-blue-600"
              type="string"
              name="contact_name"
              defaultValue={this.props.contact.number}
            />
          </div>

        </div>

        {this.props.dietaryRequirements.length > 0 &&
          <div className='mt-4 pl-6 mb-10 border-blue-300 border-b-2 pb-3' >
            <div>
              <h4 className="text-xl mb-3">Dietary requirements</h4>

              <ul>
                {this.props.dietaryRequirements.map((dietaryRequirement, index) => {
                  return (
                    <li className="mt-3" key={index}>
                      <DietaryRequirement
                        {...dietaryRequirement}
                        dayIndex={this.props.index}
                        reqIndex={index}
                        updatePercentage={this.props.updatePercentage}
                        percentage={dietaryRequirement.percentage}
                      />
                      {index === this.props.dietaryRequirements.length - 1 &&
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm bl float-right focus:outline-none focus:border-blue-600" onClick={this.addDietaryRequirementClick}>Add another dietary requirement</button>
                      }
                    </li>
                  )
                })}
              </ul>


            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

OrderDay.propTypes = {
  addAnotherDay: PropTypes.func,
  addDietaryRequirement: PropTypes.func,
  contact: PropTypes.exact({
    name: PropTypes.string,
    number: PropTypes.string,
  }),
  date: PropTypes.string,
  dietaryRequirements: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  quantity: PropTypes.string,
  updateContactName: PropTypes.func,
  updateDate: PropTypes.func,
  updatePercentage: PropTypes.func,
  updateQuantity: PropTypes.func,
}
