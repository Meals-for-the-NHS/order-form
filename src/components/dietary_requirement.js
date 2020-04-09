import React from "react"
import PropTypes from "prop-types"

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

export default class DietaryRequirement extends React.Component {

  // handleFoodTypeSelectionChange(e) {
  //   this.props.
  // }

  constructor() {
    super()

    this.handlePercentageChange = this.handlePercentageChange.bind(this)
  }

  handlePercentageChange(e) {
    this.props.updatePercentage(this.props.dayIndex, this.props.reqIndex, e.target.value)
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="percentage" className="mr-3">Percentage</label>
        <input
          type="number"
          name="percentage"
          defaultValue={this.props.percentage}
          min="0"
          max="100"
          className="w-16 text-right mr-4 border-blue-300 border-2 rounded-md"
          onChange={this.handlePercentageChange}
        />

        <select name="food_type" className="border-blue-300 border-2 rounded-md" value={this.props.type}>
          {FOOD_TYPES.map((type) => {
            return <option
              key={type.value}
              value={type.value}
              label={type.label}
            />
          })}
        </select>
      </React.Fragment>
    )
  }
}

DietaryRequirement.propTypes = {
  percentage: PropTypes.string,
  type: PropTypes.oneOf(FOOD_TYPES.map((x) => x.value)),
  dayIndex: PropTypes.number,
  reqIndex: PropTypes.number,
  updatePercentage: PropTypes.func,
}
