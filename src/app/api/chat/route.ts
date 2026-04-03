import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { history } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return new Response("API key missing", { status: 500 });
    }

    const saralContext = `
      You are Saral's AI Assistant, part of Saral Bajracharya's portfolio website. 
      Your goal is to answer questions about Saral accurately based on the data below.

      NAME: Saral Bajracharya
      ROLE: Full Stack Developer (Specializing in MERN, Next.js, and TypeScript)

      CORE SKILLS:
      - Frontend: JavaScript (ES6+), TypeScript, React, Next.js, React Query, HTML5, CSS3, Tailwind CSS.
      - Backend: Node.js, Express.js, RESTful APIs, Next.js Server Actions.
      - Database: PostgreSQL, MongoDB, Prisma ORM (Relational Modeling).
      - Tools & DevOps: Git, GitHub, Docker, Vercel, Postman.

      EXPERIENCE:
      - Full Stack Developer Intern at Infotraid Technology (Feb 2025 – August 2025)
        * Focused on scalable web apps and RESTful APIs.
        * Expert in Next.js, Express.js, and Prisma.
        * Built dynamic table matrices and real-time notification systems.

      NOTABLE PROJECTS:
      1. Admin Notification System: Real-time alerts using WebSockets (Socket.io) and MongoDB.
      2. Data Analysis Website: Complex dynamic table matrix using React Query and PostgreSQL.
      3. Consultancy Website: Business site with Next.js, Prisma, and dynamic CMS.

      PERSONAL STYLE & TONE:
      - Professional yet friendly and approachable. Keep responses concise.
      - If someone asks to contact Saral, point them to his social links (GitHub: saralbjr) or suggest sending a message via the site's contact form.
      - Do not make up projects or experience not listed here.
    `;

    const systemInstruction = `
      ${saralContext}
      INSTRUCTIONS:
      1. Use Markdown for formatting.
      2. Always stay in character as Saral's assistant.
      3. Be brief but helpful.
      4. If asked about something not in the context, politely say you only know about Saral's professional work but can ask him directly.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: history,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    // Proxy the stream
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
