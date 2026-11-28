// Everything you are likely to change lives here or in lib/data/*.json.
export const SITE = {
  name: 'ProjectDuniya Store',
  host: 'stores.projectduniya.com',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://stores.projectduniya.com').replace(/\/$/, ''),
  whatsapp: '918391808784',
  phone: '+91 83918 08784',
  email: 'projectduniya.help@gmail.com',
  instagram: 'https://www.instagram.com/projectduniya.help',
  telegram: 'https://t.me/HiringAlertt',
  facebook: 'https://www.facebook.com/profile.php?id=61580355323239',
};

export const NETWORK = {
  main: 'https://www.projectduniya.com',
  blogs: 'https://blogs.projectduniya.com',
  tools: 'https://tools.projectduniya.com',
};

export const DELIVERABLES: [string, string][] = [
  ['Complete source code', 'Runs on your laptop, with a setup guide to get it started.'],
  ['Project report', 'Editable DOC and PDF in standard academic chapters.'],
  ['PPT presentation', 'Slides ready for your review or final presentation.'],
  ['Database and dataset', 'Sample data and database files where the project needs them.'],
  ['Viva question bank', 'Likely questions with short answers, so you can explain the project.'],
  ['WhatsApp setup help', 'Ask the team if something does not run or you need to understand a module.'],
];

export const STEPS: [string, string][] = [
  ['Pick a project', 'Read the features, tech stack and what is included. Every project shows its price.'],
  ['Tap Buy on WhatsApp', 'A message with the project name, code and price is filled in for you. Just press send.'],
  ['Confirm on WhatsApp', 'The team confirms what is included, any changes you want, and how to pay.'],
  ['Get your files', 'Receive the source code, report, PPT and viva notes, with help to set it up.'],
];

export const FAQS: [string, string][] = [
  ['How do I buy a project?', 'Open the project, tap Buy on WhatsApp and send the pre-filled message. The team replies on WhatsApp to confirm details and payment.'],
  ['What is included with each project?', 'Every project page lists what you get. Usually that is source code, report, PPT, viva questions and setup help, but check the page for the specific project.'],
  ['Can I ask for changes to a project?', 'Yes. Mention it when you message us. Changes are quoted separately before any work starts. For something completely new, use the custom project service on projectduniya.com.'],
  ['Do I need to understand the project to present it?', 'Yes, and we help with that. The viva question bank and WhatsApp support are there so you can explain what you submit.'],
  ['Is it safe to submit as is?', 'Treat each project as a working reference and learning material. Follow your institution’s rules and make sure you can explain and adapt your own submission. See our academic integrity page.'],
  ['What if the project does not run?', 'Message us on WhatsApp with a screenshot of the error. See the refund and cancellation policy on projectduniya.com for the full terms.'],
];
