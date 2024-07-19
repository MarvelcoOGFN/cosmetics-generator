const axios = require('axios');
const fs = require('fs');

async function is_valid_intro(intro) {
    if (!intro) return false;
    if ('chapter' in intro && 'season' in intro) {
        if (intro.chapter === '1' && intro.season.match(/^\d+$/) && parseInt(intro.season) <= 10 ) {
            return true;
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
                    shopHistory: item.shopHistory
                };
                valid_items.push(valid_item);
            }
        }

        fs.writeFileSync('items.json', JSON.stringify(valid_items, null, 4));
        console.log('Items successfully saved to items.json');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
