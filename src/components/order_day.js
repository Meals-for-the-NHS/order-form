import React from "react";
import DietaryRequirement from "./dietary_requirement";

export default class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      dietaryRequirements: [],
    }

    this.addDietaryRequirement = this.addDietaryRequirement.bind(this)
  }

  addDietaryRequirement(e) {
    e.target.className = `${e.target.className} hidden`
    let existingRequirements = this.state.dietaryRequirements

    existingRequirements.push(
      {
        value: 0,
        option: null,
      }
    )
    this.setState({ dietaryRequirements: existingRequirements })
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
            defaultValue="0"
            className="w-16 text-right ml-2 mr-2 border-blue-300 border-2 rounded-md"
          />
          for
          <input className="ml-3 border-blue-300 border-2 rounded-md" type="date"
            defaultValue={this.props.date}
          />
          <div className="float-right">
            <button className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm mr-3 ${this.state.dietaryRequirements.length > 0 ? 'hidden' : 'inline'}`} onClick={this.addDietaryRequirement}>
              Add dietary requirements
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm bl" onClick={this.props.addAnotherDay}>Add another day</button>
          </div>
        </div>

        <div>

        </div>

        {this.state.dietaryRequirements.length > 0 &&
          <div className='mt-4 pl-6' >
            <div>
              <h4 className="text-3xl mb-3">Dietary requirements</h4>

              <ul>
                {this.state.dietaryRequirements.map((dietaryRequirement, index) => {
                  return (
                    <li className="mt-3" key={index}>
                      <DietaryRequirement {...dietaryRequirement} />
                      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-sm bl float-right" onClick={this.addDietaryRequirement}>Add another dietary requirement</button>
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
