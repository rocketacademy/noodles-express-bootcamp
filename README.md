# Rocket Academy Coding Bootcamp: Noodles Express

This exercise is a post-class exercise for Rocket Academy to create a noodle recipe app using Express and recipe data provided by RA.

## Usage

### Get single recipe by index

http://localhost:3004/recipe/:index

http://localhost:3004/recipe/1

```json
{
  "source": "Smitten Kitchen",
  "label": "Noodle Kugel recipes",
  "url": "http://www.edamam.com/recipe/noodle-kugel-recipes-d6452a86e2edb13bbeb305904fd2a7f1/noodle",
  "ingredients": "1 pound wide egg noodles\n2 8-ounce packages cream cheese, softened\n1 pound (16 ounces) creamed cottage cheese, full fat\n1 1/2 cups sugar\n1 stick salted butter, melted, plus more for greasing the baking dish\n8 eggs\n2 teaspoons vanilla\n1 teaspoon cinnamon\n1 cup dried cherries",
  "yield": 4,
  "caution": "Sulfites",
  "image": "https://www.edamam.com/web-img/129/1299cd9a98464c5f76952710aa71aaba",
  "category": "Tree-Nut-Free"
}
```

### Get recipe by yield

http://localhost:3004/yield/:index
http://localhost:3004/yield/1

```json
[
  {
    "source": "My Recipes",
    "label": "Noodle Bowl",
    "url": "http://www.edamam.com/recipe/noodle-bowl-a4d6a51b0acb9ae51267830cd011d39f/noodle",
    "ingredients": "1 (3-oz.) package Oriental-flavored ramen noodle soup mix\n2 cups water\n1 chopped green onion\n2 tablespoons chopped fresh cilantro\n1/2 cup fresh snow peas, trimmed\n6 peeled and deveined medium-size raw shrimp (26/30 count)\n1/4 cup shredded napa cabbage\n1 to 2 Tbsp. chopped peanuts",
    "yield": 1,
    "caution": "Sulfites",
    "image": "https://www.edamam.com/web-img/b88/b88acc0af1ce23b50042d7d24e8a33d7.jpg"
  },
  {
    "source": "BBC Good Food",
    "label": "Seafood Noodle Soup",
    "url": "http://www.edamam.com/recipe/seafood-noodle-soup-01b822e1744a30e789917e7e64e96d38/noodle",
    "ingredients": "50 g dried egg noodles\n100 g mushrooms (chestnut are good, but any will do), sliced\n1 tsp fish sauce\n25 g squid rings\n100 g mange tout, halved\n50 g cooked mussels\nchilli to taste\n40 g red pepper, sliced\n1/2 tsp garlic paste\n100 g carrot, sliced\n1 tsp olive oil\n50 g baby sweetcorn, halved\n1 tsp vegetable buillion powder",
    "yield": 1,
    "caution": "Shellfish",
    "image": "https://www.edamam.com/web-img/c07/c07efdfcc1d4a76fdf517280d2410f0b.jpg"
  },
  {
    "source": "My Recipes",
    "label": "Miso Noodle Soup",
    "url": "http://www.edamam.com/recipe/miso-noodle-soup-fe2a16741057ec951b4b0b890e54cfe2/noodle",
    "ingredients": "1 tablespoon white miso\n1 tablespoon warm water\n1 teaspoon toasted sesame oil\n1/2 small garlic clove, grated\n1/3 cup thinly sliced red cabbage\n1/2 cup cooked flat brown rice (pad Thai) noodles (about 1 oz. uncooked)\n2 shiitake mushroom caps, thinly sliced\n1 tablespoon chopped green onions\n4 thin slices red jalapeño\n1 tablespoon chopped fresh cilantro\n1/2 hard-cooked large egg",
    "yield": 1,
    "caution": "Gluten",
    "image": "https://www.edamam.com/web-img/57a/57a08db80f149389905e060f730db827.jpg",
    "category": "Alcohol-Free"
  }
]
```

### Get recipes by label

http://localhost:3004/recipe-label/:label

http://localhost:3004/recipe-label/udon-noodle-soup

```json
[
  {
    "source": "BBC Good Food",
    "label": "Udon noodle soup",
    "url": "http://www.edamam.com/recipe/udon-noodle-soup-bf283c727cd11fb8ce42b98f09dabbac/noodle",
    "ingredients": "1 vegetable stock cube\n50ml teriyaki sauce\n1 tbsp vegetable oil\n140g chestnut mushroom, sliced\n½ bunch spring onions, thinly sliced\n140g udon noodle\n200g bag spinach",
    "yield": 4,
    "caution": "Sulfites",
    "image": "https://www.edamam.com/web-img/7b2/7b24a14c8756cc1db75eb216fb593e6d.jpg",
    "category": "Vegan"
  },
  {
    "source": "Cookstr",
    "label": "Udon Noodle Soup",
    "url": "http://www.edamam.com/recipe/udon-noodle-soup-2b744ab3097f774c9c03436f4c1c4ab2/noodle",
    "ingredients": "6 cups cold water\n1½ pounds chicken necks, wings, and backs\n6 slices fresh ginger\n2 leeks, washed, including 2 inches of the green\n1½ teaspoons salt\n½ teaspoon freshly ground black pepper\n2 egg whites, beaten\n4 ounces udon noodles\n1 bunch radishes, thinly sliced\n1 bunch scallions, thinly sliced on the diagonal, including 2 inches of the green\n4 ounces Chinese cabbage, thinly sliced",
    "yield": 10,
    "image": "https://www.edamam.com/web-img/77f/77f47f5f878228fde83061784d302bae.jpg",
    "category": "Alcohol-Free"
  }
]
```
