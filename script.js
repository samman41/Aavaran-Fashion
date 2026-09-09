const CONFIG = {
    // Profile Details
    name: "AAVARAN FASHION",
    title: "Boutique Elegance",

    // Paths to Images (Ensure these match the actual files in your directory)
    logoPath: "image/logo.jpg",
    backgroundPath: "image/background image.png",

    // Social & Contact Links
    links: [
        { id: "instagram", label: "Instagram", url: "https://www.instagram.com/aavaranfashionattire?stkn=MW1uM3FpcGVsYjlhag%3D%3D" },
        { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@aavaranfashionattire?_r=1&_t=ZS-99aHiIzBITF" },
        { id: "facebook", label: "Facebook", url: "https://www.facebook.com/share/1QMKX5Ekjc/" },
        { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/1234567890" },
        { id: "gmail", label: "Email Us", url: "mailto:contact@aavaran.com" },
        { id: "location", label: "Location", url: "https://maps.app.goo.gl/UEfUks4VwjykiFGL6?g_st=ac" }
    ],

    // Save Contact (vCard) Details for Address Book
    vcard: {
        firstName: "Aavaran",
        lastName: "Fashion",
        phone: "+1 234 567 890",
        email: "contact@aavaran.com",
        company: "Aavaran Fashion Attire",
        website: "https://www.instagram.com/aavaranfashionattire?stkn=MW1uM3FpcGVsYjlhag%3D%3D"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Background and Logo
    document.getElementById('background-container').style.backgroundImage = `url('${CONFIG.backgroundPath}')`;
    document.getElementById('profile-logo').src = CONFIG.logoPath;

    // 2. Set Profile Information
    document.getElementById('profile-name').textContent = CONFIG.name;
    document.getElementById('profile-title').textContent = CONFIG.title;

    // 3. Generate Link Buttons Dynamically
    const linksContainer = document.getElementById('links-container');
    CONFIG.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-btn';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const span = document.createElement('span');
        span.className = 'link-text';
        span.textContent = link.label;

        a.appendChild(span);
        linksContainer.appendChild(a);
    });

    // 4. Handle 'Save Contact' Generation (vCard format)
    const saveBtn = document.getElementById('save-contact-btn');
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const v = CONFIG.vcard;

        // Construct vCard 3.0 String
        const vcardData = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `N:${v.lastName};${v.firstName};;;`,
            `FN:${v.firstName} ${v.lastName}`,
            `ORG:${v.company}`,
            `TEL;TYPE=WORK,VOICE:${v.phone}`,
            `EMAIL;TYPE=PREF,INTERNET:${v.email}`,
            `URL:${v.website}`,
            "END:VCARD"
        ].join("\r\n");

        // Trigger file download
        const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${v.firstName}_${v.lastName}.vcf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    });
});
