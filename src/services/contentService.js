const pool = require('../config/db');

async function getAllContent() {
    // 1️⃣ Fetch all sections
    const [sections] = await pool.query('SELECT * FROM sections');

    const result = [];

    for (const section of sections) {
        // 2️⃣ Fetch items for section
        const [items] = await pool.query('SELECT * FROM items WHERE section_id = ?', [section.id]);

        const itemsWithDetails = [];

        for (const item of items) {
            // 3️⃣ Fetch item details
            const [details] = await pool.query('SELECT * FROM item_details WHERE item_id = ?', [item.id]);

            const detailsWithCategories = [];
            for (const detail of details) {
                const [categories] = await pool.query('SELECT * FROM categories WHERE detail_id = ?', [detail.id]);

                detailsWithCategories.push({
                    id: detail.id,
                    heading: detail.heading,
                    description: JSON.parse(detail.description || '[]'),
                    bottomDescription: JSON.parse(detail.bottom_description || '[]'),
                    featureContent: detail.feature_content ? { content: detail.feature_content, image: detail.feature_image } : false,
                    contact: detail.contact ? true : false,
                    image: detail.image,
                    categories: categories.map(cat => ({
                        id: cat.category_key,
                        label: cat.label,
                        image: cat.image,
                        description: cat.description,
                        learnmore: cat.learnmore ? true : false
                    }))
                });
            }

            // 4️⃣ Fetch partner tables if exist
            const [partnerTables] = await pool.query('SELECT * FROM partner_tables WHERE item_id = ?', [item.id]);
            const tablesWithItems = [];

            for (const table of partnerTables) {
                const [tableItems] = await pool.query('SELECT * FROM partner_table_items WHERE table_id = ?', [table.id]);
                tablesWithItems.push({
                    heading: table.heading,
                    items: tableItems.map(ti => ti.item_name)
                });
            }

            // 5️⃣ Fetch more images if exist
            const [moreImages] = await pool.query('SELECT * FROM more_images WHERE item_id = ?', [item.id]);

            itemsWithDetails.push({
                id: item.item_key,
                label: item.label,
                intro: item.intro,
                api_url: item.api_url || undefined,
                details: detailsWithCategories.length ? detailsWithCategories : undefined,
                tables: tablesWithItems.length ? tablesWithItems : undefined,
                moreImage: moreImages.length ? moreImages.map(mi => ({ image: mi.image, link: mi.link })) : undefined
            });
        }

        result.push({
            header: section.header,
            count: section.count,
            items: itemsWithDetails
        });
    }

    return result;
}

module.exports = { getAllContent };
