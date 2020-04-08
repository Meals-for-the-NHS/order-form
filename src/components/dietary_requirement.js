import React from "react"
import PropTypes from "prop-types"

export default class DietaryRequirement extends React.Component {
  render() {
    const FOOD_TYPES = [
      {
        value: "halal",
        label: "Halal",
      },
      {
        value: "vegetarian",
        label: "Vegetarian",
      }
    ]

    return (
      <React.Fragment>
        <label htmlFor="percentage" className="mr-3">Percentage</label>
        <input type="number" name="percentage" defaultValue={this.props.value}
          min="0" max="100" className="w-16 text-right mr-4 border-blue-300 border-2 rounded-md" />

        <select name="food_type" className="border-blue-300 border-2 rounded-md">
          {FOOD_TYPES.map((type) => {
            return <option key={type.value} value={type.value} label={type.label} />
          })}
        </select>
      </React.Fragment>
    )
  }
}

DietaryRequirement.propTypes = {
  value: PropTypes.number,
}
