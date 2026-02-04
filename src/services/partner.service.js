const db = require("../config/db");

exports.getAllSections = async () => {
    const [sections] = await db.query("SELECT * FROM partner_sections");

    // Fetch items for each section
    for (const section of sections) {
        const [items] = await db.query(
            "SELECT * FROM partner_items WHERE section_id = ?",
            [section.id]
        );
        section.items = items;
    }

    return sections;
};

exports.getItemDetails = async (itemIdStr) => {
    const [items] = await db.query(
        "SELECT * FROM partner_items WHERE item_id_str = ?",
        [itemIdStr]
    );

    if (items.length === 0) return null;

    const item = items[0];

    // Fetch content blocks for the item
    const [blocks] = await db.query(
        "SELECT * FROM partner_content_blocks WHERE item_id = ? ORDER BY display_order ASC",
        [item.id]
    );

    // Initial structure
    const result = {
        ...item,
        section: [],
        details: [],
        tables: [],
        moreImage: []
    };

    if (Array.isArray(blocks)) {
        blocks.forEach(block => {
            const blockType = String(block.block_type).trim();
            let content = block.content;

            // Handle cases where mysql2 might not have parsed the JSON automatically
            if (typeof content === 'string' && (content.startsWith('[') || content.startsWith('{'))) {
                try {
                    content = JSON.parse(content);
                } catch (e) {
                    console.error(`Error parsing JSON content for block type ${blockType}:`, e.message);
                }
            }

            // Map based on block_type
            if (blockType === 'section') {
                result.section = Array.isArray(content) ? content : (content ? [content] : []);
            } else if (blockType === 'details') {
                result.details = Array.isArray(content) ? content : (content ? [content] : []);
            } else if (blockType === 'tables') {
                result.tables = Array.isArray(content) ? content : (content ? [content] : []);
            } else if (blockType === 'moreImage') {
                result.moreImage = Array.isArray(content) ? content : (content ? [content] : []);
            }
        });
    }

    return result;
};
