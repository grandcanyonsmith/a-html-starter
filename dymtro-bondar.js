const surveyData = {
    email: "bondar@thefirstmillion.biz",
    startDate: "September 2023",
    totalRevenue: "$3,552 (USD)",
    lastMonthRevenue: "$400 (USD)",
    goals: [
        "In 12 months, I want to reach the $100,000 mark.",
        "I want to find a successful, predictable source of leads that will convert into sales at the expected conversion rate."
    ],
    challenges: [
        "I don't know how to generate the right content to attract the right leads.",
        "I don't know how to build/generate the right content via Instagram.",
        "I don't know how to build/generate the right content via FB ads.",
        "I'm struggling to identify very clearly my target audience and how to reach them."
    ],
    trackingSystem: "Yes, using Excel.",
    salesTrackingSheet: "Yes, available on request.",
    teamMembers: ["Dmytro Bondar (Co-owner, CEO)"],
    idealCustomer: "Our ideal customer is a small builder who needs deep expertise in building his 1-2nd house. We also feel that our customers are contractors who want to become general contractors. Additionally, we believe that everyone who is building a house for themselves needs deep expertise in the building process to avoid being cheated by a general contractor.",
    freeOffers: [
        'Free template to download - How to choose land for your first house: <a href="https://link.coursecreator360.com/widget/form/ccDNCKJCiAI1gtWclomQ" class="text-blue-500 underline">Download</a>',
        'Finishing free template on "Getting Permits"'
    ],
    lowTicketOffers: "I still don't have a low-ticket offer.",
    midTicketOffers: "I still don't have a mid-ticket offer.",
    highTicketOffers: '<a href="https://www.thefirstmillion.biz/sales-page-page837990" class="text-blue-500 underline">High-Ticket Offer</a>',
    subscriptionOffers: "I don't have a subscription or recurring offer, only a 'one-time purchase offer'.",
    strategy: "I have not run any ads. I made posts in about 200+ FB groups and generated a lot of new contacts.",
    successExpectations: [
        "At least to get ROI on the money I invested.",
        "Real success will be if I can reach $10,000+ per month of net profit.",
        "Tremendous success will be if I can build a team that will be able to reach $15,000-$20,000 without my 24/7 involvement."
    ],
    additionalHelpNeeded: [
        "FB ads",
        "Email conversion and automation",
        "Help with the right content for Instagram"
    ],
    existingWebsites: '<a href="https://www.thefirstmillion.biz/buildinghome" class="text-blue-500 underline">thefirstmillion.biz/buildinghome</a>',
    proficiencies: {
        filming: 5,
        editing: 5,
        marketResearch: 3,
        productOffering: 3,
        facebookAds: 1,
        youtubeAds: 2,
        leadGeneration: 1,
        webinar: 1,
        appointmentSetting: 3,
        phoneSales: 3,
        flashSales: 2,
        emailCampaigns: 2,
        retargeting: 1,
        funnels: 2,
        websiteDesigning: 3,
        backendAutomations: 3,
        emailSequences: 2
    }
};

function populateData() {
    document.getElementById('email').innerText = surveyData.email;
    document.getElementById('start-date').innerText = surveyData.startDate;
    document.getElementById('total-revenue').innerText = surveyData.totalRevenue;
    document.getElementById('last-month-revenue').innerText = surveyData.lastMonthRevenue;

    document.getElementById('goals').innerHTML = surveyData.goals.map(goal => `<li>${goal}</li>`).join('');
    document.getElementById('challenges').innerHTML = surveyData.challenges.map(challenge => `<li>${challenge}</li>`).join('');
    document.getElementById('tracking-system').innerText = surveyData.trackingSystem;
    document.getElementById('sales-tracking-sheet').innerText = surveyData.salesTrackingSheet;

    document.getElementById('team-members').innerHTML = surveyData.teamMembers.map(member => `<li>${member}</li>`).join('');
    document.getElementById('ideal-customer').innerText = surveyData.idealCustomer;

    document.getElementById('free-offers').innerHTML = surveyData.freeOffers.map(offer => `<li>${offer}</li>`).join('');
    document.getElementById('low-ticket-offers').innerText = surveyData.lowTicketOffers;
    document.getElementById('mid-ticket-offers').innerText = surveyData.midTicketOffers;
    document.getElementById('high-ticket-offers').innerHTML = surveyData.highTicketOffers;
    document.getElementById('subscription-offers').innerText = surveyData.subscriptionOffers;

    document.getElementById('strategy').innerText = surveyData.strategy;

    document.getElementById('success-expectations').innerHTML = surveyData.successExpectations.map(expectation => `<li>${expectation}</li>`).join('');
    document.getElementById('additional-help-needed').innerHTML = surveyData.additionalHelpNeeded.map(help => `<li>${help}</li>`).join('');

    document.getElementById('existing-websites').innerHTML = surveyData.existingWebsites;

    displayStars('filming-proficiency', surveyData.proficiencies.filming);
    displayStars('editing-proficiency', surveyData.proficiencies.editing);
    displayStars('market-research-proficiency', surveyData.proficiencies.marketResearch);
    displayStars('product-offering-proficiency', surveyData.proficiencies.productOffering);
    displayStars('facebook-ads-proficiency', surveyData.proficiencies.facebookAds);
    displayStars('youtube-ads-proficiency', surveyData.proficiencies.youtubeAds);
    displayStars('lead-generation-proficiency', surveyData.proficiencies.leadGeneration);
    displayStars('webinar-proficiency', surveyData.proficiencies.webinar);
    displayStars('appointment-setting-proficiency', surveyData.proficiencies.appointmentSetting);
    displayStars('phone-sales-proficiency', surveyData.proficiencies.phoneSales);
    displayStars('flash-sales-proficiency', surveyData.proficiencies.flashSales);
    displayStars('email-campaigns-proficiency', surveyData.proficiencies.emailCampaigns);
    displayStars('retargeting-proficiency', surveyData.proficiencies.retargeting);
    displayStars('funnels-proficiency', surveyData.proficiencies.funnels);
    displayStars('website-designing-proficiency', surveyData.proficiencies.websiteDesigning);
    displayStars('backend-automations-proficiency', surveyData.proficiencies.backendAutomations);
    displayStars('email-sequences-proficiency', surveyData.proficiencies.emailSequences);
}

function displayStars(elementId, rating) {
    const element = document.getElementById(elementId);
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '<span class="star">★</span>';
    }
    element.innerHTML = stars;
}

// Populate data on page load
document.addEventListener('DOMContentLoaded', populateData);
