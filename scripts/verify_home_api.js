const http = require('http');

async function fetch(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(data);
                }
            });
        }).on('error', reject);
    });
}

async function verify() {
    const port = 5000;
    const baseUrl = `http://127.0.0.1:${port}/api/home-content`;
    console.log(`Testing API at ${baseUrl}`);

    try {
        console.log('Fetching Home Content...');
        const content = await fetch(baseUrl);

        // 1. Check IoT Sim
        if (content.iot_sim_main) {
            console.log('✅ IoT Sim Section found.');
            console.log(`   Title: ${content.iot_sim_main.title}`);
            if (content.iot_sim_main.features?.length >= 3) {
                console.log(`   ✅ Found ${content.iot_sim_main.features.length} features (Coverage, Security, Portal).`);
            } else {
                console.error('   ❌ Features missing in IoT Sim!');
            }
        } else {
            console.error('❌ IoT Sim Section missing!');
        }

        // 2. Check Connectivity
        if (content.connectivity_main) {
            console.log('✅ Connectivity Section found.');
            if (content.connectivity_main.features?.length >= 4) {
                console.log(`   ✅ Found ${content.connectivity_main.features.length} features.`);
            } else {
                console.error('   ❌ Features missing in Connectivity!');
            }
        } else {
            console.error('❌ Connectivity Section missing!');
        }

        // 3. Check Pricing
        if (content.pricing_main) {
            console.log('✅ Pricing Section found.');
            if (content.pricing_main.features?.length > 0) {
                console.log(`   ✅ Found Pricing Card: ${content.pricing_main.features[0].title}`);
            } else {
                console.error('   ❌ Pricing Card missing!');
            }
        } else {
            console.error('❌ Pricing Section missing!');
        }

        // 4. Check Compatible Devices
        if (content.compatible_device_main) {
            console.log('✅ Compatible Device Section found.');
        } else {
            console.error('❌ Compatible Device Section missing!');
        }

    } catch (err) {
        console.error('Verification failed:', err);
    }
}

verify();
