const axios = require('axios');
const fs = require('fs');

const CHAPTER = 1; // Set to any chapter number you want
const SEASON = 10; // Limit seasons for the current chapter you set

async function is_valid_intro(intro) {
    if (!intro) return false;
    if ('chapter' in intro && 'season' in intro) {
        // If the chapter is less than the current CHAPTER, no season limit
        if (intro.chapter < CHAPTER) {
            return true;
        }
        // If the chapter is less than or equal to the current CHAPTER, check season limit
        if (intro.chapter <= CHAPTER) {
            if (intro.season.match(/^\d+$/) && parseInt(intro.season) <= SEASON) {
                return true;
            }
        }

        //Check if season 10 to get season x items (this some how works???)
        if (CHAPTER == 1 && SEASON == 10) {
            if (intro.chapter === '1') {
                return true;
            }
        }
    }
    return false;
}

async function main() {
    try {
        const url = "https://fortnite-api.com/v2/cosmetics/br";
        const response = await axios.get(url);
        const data = response.data;

        const valid_items = [];

        for (const item of data.data) {
            const intro = item.introduction;
            if (await is_valid_intro(intro)) {
                const valid_item = {
                    id: item.id,
                    type: item.type?.backendValue,
                    rarity: item.rarity?.value,
                    introduction: {
                        chapter: intro.chapter,
                        season: intro.season
                    },
                   // shopHistory: item.shopHistory
                };
                valid_items.push(valid_item);
            }
        }

        fs.writeFileSync('items.json', JSON.stringify(valid_items, null, 4));
        console.log('Items successfully saved to items.json');
    } catch (error) {
        console.error('An error occurred:', error);
    }
    
    console.log('Closing the Generator in 5 seconds...');
    setTimeout(() => {
        console.log('Exiting...');
        process.exit(0); // Exit duh
    }, 5000);
}

main();
