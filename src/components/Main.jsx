import React from 'react'
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main(){

    const [ingredients, setIngredients] = React.useState([])

    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const response = await fetch("/api/recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients }),
        })

  const data = await response.json()
  setRecipe(data.recipe)
}

function addIngredient(formData){
    const newIngredient=formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    
}
 /*why doees "ingredient" above need quotes? Because .get() expects a string key, which is literally the name attribute on that element below. .get() must receive the exact name, which is a string, so quotes are required. */

    return (
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient" /* whenever we're submitting a form, our inputs all need a name */
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && <IngredientsList
            ingredients={ingredients}
            getRecipe={getRecipe}
            />}

            {recipe && <ClaudeRecipe 
            recipe={recipe}
            />}
        </main>
    )
}