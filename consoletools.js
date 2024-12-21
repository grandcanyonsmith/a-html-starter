// tools.js

/**************************************************
 * 1) sessionUpdate Object: Tools & Parameters
 **************************************************/
export const sessionUpdate = {
  type: 'session.update',
  session: {
    tools: [
      {
        type: 'function',
        name: 'display_color_palette',
        description:
          'Call this function when a user asks for a color palette.',
        parameters: {
          type: 'object',
          strict: true,
          properties: {
            theme: {
              type: 'string',
              description: 'A short description of the palette theme.',
            },
            colors: {
              type: 'array',
              description:
                'Array of five hex color codes based on the theme.',
              items: {
                type: 'string',
                description: 'Single hex color code',
              },
            },
          },
          required: ['theme', 'colors'],
        },
      },
      {
        type: 'function',
        name: 'display_html_snippet',
        description: 'Call this function to display an HTML snippet.',
        parameters: {
          type: 'object',
          strict: true,
          properties: {
            htmlContent: {
              type: 'string',
              description: 'The HTML snippet content to render or display.',
            },
          },
          required: ['htmlContent'],
        },
      },
      {
        type: 'function',
        name: 'lookup_answer',
        description:
          'Call this function if the AI does not know the answer to a question. The function will fetch the answer from an external source.',
        parameters: {
          type: 'object',
          strict: true,
          properties: {
            question: {
              type: 'string',
              description: 'The question the AI needs to look up.',
            },
          },
          required: ['question'],
        },
      },
    ],
    tool_choice: 'auto',
  },
};

/**************************************************
 * 2) Utility: Escape HTML
 **************************************************/
export function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return map[m];
  });
}

/**************************************************
 * 3) Display Color Palette
 **************************************************/
export function displayColorPalette(theme, colors, colorPaletteDiv, colorBoxesDiv) {
  // Make sure the container is visible
  colorPaletteDiv.classList.remove('hidden');
  colorBoxesDiv.innerHTML = '';

  // Show a theme title
  const title = document.createElement('p');
  title.classList.add('mb-2', 'font-bold');
  title.textContent = 'Theme: ' + theme;
  colorBoxesDiv.appendChild(title);

  // Render each color
  colors.forEach((color) => {
    const box = document.createElement('div');
    box.className =
      'color-box flex items-center justify-center mb-1 border border-gray-200 rounded';
    box.style.height = '40px';
    box.style.backgroundColor = color;
    box.innerHTML = `
      <p
        class="text-sm font-bold text-black bg-slate-100 rounded-md
               px-2 border border-black"
      >
        ${escapeHTML(color)}
      </p>`;
    colorBoxesDiv.appendChild(box);
  });
}

/**************************************************
 * 4) Display Color Palette from Function Output
 **************************************************/
export function displayColorPaletteFromOutput(
  output,
  colorPaletteDiv,
  colorBoxesDiv,
  functionCallOutputDiv,
  functionCallDetailsDiv
) {
  const args = JSON.parse(output.arguments);

  // Display the palette in the UI
  displayColorPalette(args.theme, args.colors, colorPaletteDiv, colorBoxesDiv);

  // Show details of the function call
  functionCallOutputDiv.classList.remove('hidden');
  functionCallDetailsDiv.innerHTML = `
    <p class="mb-2">Theme: ${escapeHTML(args.theme)}</p>
    <pre class="text-xs bg-gray-100 rounded-md p-2 border border-gray-200 overflow-x-auto">
${escapeHTML(JSON.stringify(output, null, 2))}
    </pre>
  `;
}

/**************************************************
 * 5) Handle Display HTML Snippet
 **************************************************/
export function handleDisplayHtmlSnippet(args, htmlVersions, viewHtmlSnippetsDiv) {
  const { htmlContent } = args;
  // Add snippet version to array
  htmlVersions.push({ htmlContent, output: null }); // We'll store function output separately if needed
  // Reveal the HTML Snippets button (if hidden)
  viewHtmlSnippetsDiv.classList.remove('hidden');
}

/**************************************************
 * 6) Lookup External Answer
 **************************************************/
export async function lookupAnswer(question) {
  const res = await fetch(
    'https://cksi5kkz37of5rax5ciycvdd640iudlf.lambda-url.us-west-2.on.aws/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    }
  );

  if (!res.ok) {
    throw new Error(`Lookup request failed with status: ${res.status}`);
  }
  const data = await res.json();
  const parsedBody = JSON.parse(data.body);

  return parsedBody.response;
}
