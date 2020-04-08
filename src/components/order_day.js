import React from "react";
import PropTypes from "prop-types"
import DietaryRequirement from "./dietary_requirement";

export default class OrderDay extends React.Component {
  constructor() {
    super()

    this.addDietaryRequirementClick = this.addDietaryRequirementClick.bind(this)
    this.updateQuantityChange = this.updateQuantityChange.bind(this)
  }

  addDietaryRequirementClick() {
    this.props.addDietaryRequirement(this.props.index)
  }

  updateQuantityChange(e) {
    this.props.updateQuantity(this.props.index, e.target.value)
  }

  render() {
    return (
      <React.Fragment>
        <div className="border-blue-300 border-b-2 pb-3">
          Order
          <input
            type="number"
            name="quantity"
            min="0"
            defaultValue={this.props.day.quantity}
            className="w-16 text-right ml-2 mr-2 border-blue-300 border-2 rounded-md"
            onChange={this.updateQuantityChange}
          />
          meals for
          <input className="ml-3 border-blue-300 border-2 rounded-md" type="date"
            defaultValue={this.props.day.date}
          />
          <div className="float-right">
            {this.props.day.dietaryRequirements &&
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm mr-3" onClick={this.addDietaryRequirementClick}>
                Add dietary requirements
              </button>
            }
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm bl" onClick={this.props.addAnotherDay}>Add another day</button>
          </div>
        </div>

        <div>

        </div>

        {this.props.day.dietaryRequirements.length > 0 &&
          <div className='mt-4 pl-6 mb-10 border-blue-300 border-b-2 pb-3' >
            <div>
              <h4 className="text-xl mb-3">Dietary requirements</h4>

              <ul>
                {this.props.day.dietaryRequirements.map((dietaryRequirement, index) => {
                  return (
                    <li className="mt-3" key={index}>
                      <DietaryRequirement {...dietaryRequirement} percentChange={this.props.updatePercentage} />
                      {index === this.props.day.dietaryRequirements.length - 1 &&
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm bl float-right" onClick={this.addDietaryRequirementClick}>Add another dietary requirement</button>
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
  day: PropTypes.object,
  dietaryRequirements: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  updateQuantity: PropTypes.func,
  updatePercentage: PropTypes.func,
}
