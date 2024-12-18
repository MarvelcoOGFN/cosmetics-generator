# Cosmetics Generator

## What it gets:

-AthenaCharacter

-AthenaBackpack

-AthenaPickaxe

-AthenaMusicPack

-AthenaGlider

-AthenaDance

### To use this you first go to line 4 and 5 to pick what chapter and season you want then you install packages then run it

this uses https://fortnite-api.com/v2/cosmetics/br to get them then puts it in this configuration inside a file called items.json located where you extracted the src 

# Example

```
    {
        "id": "The id of the item",
        "type": "type of it for example AthenaBackpack",
        "rarity": "its rarity for example rare or shadow series etc",
        "introduction": {
            "chapter": "what chapter it was made",
            "season": "what season it was made"
        },
        "shopHistory": when was it on the itemshop
    },

```
### Note: To get Shop History uncomment line 50
