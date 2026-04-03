(function() {
  // ==========================================
  // INJECT STYLES (Streaming Optimized)
  // ==========================================
  const styles = `
    .ai-chat-widget {
      position: fixed; bottom: 30px; right: 30px;
      z-index: 999998; font-family: var(--font-poppins), system-ui, -apple-system, sans-serif;
      display: flex; flex-direction: column; align-items: flex-end; pointer-events: none;
    }
    
    .ai-chat-button-area { pointer-events: all; }
    .ai-chat-window.ai-chat-visible { pointer-events: all; }

    /* The Button Area */
    .ai-chat-button-area {
      position: relative;
      display: flex; justify-content: flex-end;
    }

    /* Welcome Bubble Badge */
    .ai-chat-badge {
      background: var(--accent); color: #ffffff;
      padding: 12px 20px; border-radius: 16px; border-bottom-right-radius: 4px;
      font-size: 0.9rem; font-weight: 500;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px var(--accent-glow);
      opacity: 0; transform: translateY(10px) scale(0.9);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap; pointer-events: none;
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: absolute;
      bottom: 80px;
      right: 0;
    }
    
    .ai-chat-badge::after {
      content: ''; position: absolute; bottom: -8px; right: 24px;
      width: 16px; height: 16px; background: var(--accent);
      transform: rotate(45deg); clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
    }

    .ai-chat-badge.visible {
      opacity: 1; transform: translateY(0) scale(1);
      animation: badge-float 3.5s ease-in-out infinite;
    }
    
    @keyframes badge-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }

    /* THE ICON BUTTON */
    .ai-chat-toggle-btn {
      width: 64px; height: 64px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      color: #ffffff; border: 2px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 25px var(--accent-glow), 0 10px 30px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      outline: none; padding: 0; position: relative;
    }
    
    .ai-chat-toggle-btn::before {
      content: ''; position: absolute; top: -4px; left: -4px; right: -4px; bottom: -4px;
      border-radius: 50%; border: 2px solid var(--accent);
      opacity: 0.5; animation: icon-ring-pulse 2.5s infinite;
    }

    @keyframes icon-ring-pulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .ai-chat-toggle-btn:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 0 45px var(--accent-glow), 0 15px 40px rgba(0,0,0,0.4);
    }
    
    /* WINDOW STYLES */
    .ai-chat-window {
      background: var(--card-bg); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--card-border); border-radius: 28px;
      width: 400px; max-width: calc(100vw - 40px); height: 600px; max-height: calc(100vh - 140px);
      margin-bottom: 20px; display: flex; flex-direction: column; overflow: hidden;
      opacity: 0; transform: translateY(30px) scale(0.95); pointer-events: none;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); transform-origin: bottom right;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
    }
    .ai-chat-window.ai-chat-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

    .ai-chat-header { padding: 24px 28px; border-bottom: 1px solid var(--card-border); display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.03); }
    .ai-chat-messages { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 20px; scroll-behavior: smooth; }
    .ai-chat-messages::-webkit-scrollbar { width: 4px; }
    .ai-chat-messages::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 10px; }

    .ai-chat-msg {
      max-width: 85%; padding: 15px 20px; border-radius: 20px; font-size: 0.95rem; line-height: 1.65;
      animation: msg-in 0.4s ease-out forwards; opacity: 0;
    }
    @keyframes msg-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .ai-chat-msg.user { align-self: flex-end; background: var(--accent); color: #fff; border-bottom-right-radius: 4px; }
    .ai-chat-msg.bot { align-self: flex-start; background: var(--background-secondary); color: var(--foreground); border: 1px solid var(--card-border); border-bottom-left-radius: 4px; }

    .ai-chat-chips-container { padding: 0 28px 24px; display: flex; flex-wrap: wrap; gap: 10px; }
    .ai-chat-chip { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--card-border); color: var(--foreground); padding: 10px 18px; border-radius: 24px; font-size: 0.85rem; transition: all 0.3s ease; }
    .ai-chat-chip:hover { border-color: var(--accent); background: var(--accent-glow); transform: translateY(-2px); }

    .ai-chat-input-area { padding: 24px 28px; border-top: 1px solid var(--card-border); display: flex; gap: 14px; background: rgba(0, 0, 0, 0.04); }
    .ai-chat-input { flex: 1; background: var(--background-secondary); border: 1px solid var(--card-border); color: var(--foreground); padding: 14px 20px; border-radius: 16px; outline: none; font-family: inherit; font-size: 0.95rem; }
    .ai-chat-send { background: var(--accent); color: #fff; border: none; border-radius: 16px; width: 52px; min-width: 52px; display: flex; align-items: center; justify-content: center; }
    
    .ai-typing-indicator { display: none; align-self: flex-start; background: var(--background-secondary); padding: 14px 20px; border-radius: 20px; gap: 6px; margin-bottom: 10px; }
    .ai-typing-indicator.active { display: flex; }
    .ai-typing-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; animation: ai-typing 1.4s infinite ease-in-out both; }
    @keyframes ai-typing { 0%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
    
    .ai-hidden { display: none !important; }
  `;

  const widgetHtml = `
    <div class="ai-chat-window" id="ai-chat-window">
      <div class="ai-chat-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)); display: flex; align-items: center; justify-content: center; color: #fff;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div><h3 style="margin:0; font-size: 1.1rem;">Saral's Assistant</h3><div style="font-size: 0.75rem; color: var(--accent);">Online & Ready</div></div>
        </div>
      </div>
      <div class="ai-chat-messages" id="ai-chat-messages">
        <div class="ai-chat-msg bot">Hi! Ask me anything about Saral!</div>
      </div>
      <div class="ai-typing-indicator" id="ai-typing-indicator"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div></div>
      <div class="ai-chat-chips-container" id="ai-chat-chips">
        <button class="ai-chat-chip cursor-interactive" data-q="What are your core skills?">🎯 Core Skills</button>
        <button class="ai-chat-chip cursor-interactive" data-q="Tell me about your projects.">💻 Top Projects</button>
        <button class="ai-chat-chip cursor-interactive" data-q="Where have you worked?">💼 Experience</button>
      </div>
      <form class="ai-chat-input-area" id="ai-chat-form">
        <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Ask about Saral..." autocomplete="off">
        <button type="submit" class="ai-chat-send cursor-interactive" id="ai-chat-send">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </form>
    </div>
    
    <div class="ai-chat-button-area">
      <div class="ai-chat-badge" id="ai-chat-badge">Ask me anything about Saral 👋</div>
      <button class="ai-chat-toggle-btn cursor-interactive" id="ai-chat-toggle">
        <svg class="ai-chat-toggle-icon chat-icon" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <svg class="ai-chat-toggle-icon close-icon" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:none;"><path d="M18 6L6 18M6 6l12 12"></path></svg>
      </button>
    </div>
  `;

  function init() {
    if (!document.body) { setTimeout(init, 100); return; }
    const styleTag = document.createElement('style'); styleTag.innerHTML = styles; document.head.appendChild(styleTag);
    const wrapper = document.createElement('div'); wrapper.className = 'ai-chat-widget'; wrapper.innerHTML = widgetHtml; document.body.appendChild(wrapper);

    const win = document.getElementById('ai-chat-window');
    const toggle = document.getElementById('ai-chat-toggle');
    const badge = document.getElementById('ai-chat-badge');
    const chatIcon = toggle.querySelector('.chat-icon');
    const closeIcon = toggle.querySelector('.close-icon');
    const form = document.getElementById('ai-chat-form');
    const input = document.getElementById('ai-chat-input');
    const msgArea = document.getElementById('ai-chat-messages');
    const chips = document.getElementById('ai-chat-chips');
    const typing = document.getElementById('ai-typing-indicator');
    
    let isOpen = false; let isTyping = false; const history = [];

    // Badge visibility logic (show then auto-hide)
    setTimeout(() => { 
      if (!isOpen) {
        badge.classList.add('visible');
        // Hide after another 10 seconds
        setTimeout(() => {
          badge.classList.remove('visible');
        }, 10000);
      }
    }, 3000);

    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      win.classList.toggle('ai-chat-visible', isOpen);
      if (isOpen) {
        badge.classList.remove('visible');
        chatIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        setTimeout(() => input.focus(), 100);
      } else {
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });

    form.addEventListener('submit', (e) => { e.preventDefault(); const t = input.value.trim(); if (t) sendMessage(t); });
    chips.addEventListener('click', (e) => { const c = e.target.closest('.ai-chat-chip'); if (c) { chips.classList.add('ai-hidden'); sendMessage(c.getAttribute('data-q')); } });

    async function sendMessage(text) {
      if (isTyping) return;
      chips.classList.add('ai-hidden');
      appendMsg(text, 'user');
      input.value = '';
      history.push({ role: "user", parts: [{ text }] });
      setTyping(true);
      
      let botContent = "";
      let currentBotMsgEl = null;
      let buffer = ""; // Buffer to handle partial SSE chunks
      
      try {
        const res = await fetch('/api/chat', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ history }) 
        });

        if (!res.ok) throw new Error('API Error');
        
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        setTyping(false);
        currentBotMsgEl = createBotMsgEl();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Keep the last partial line in the buffer
          buffer = lines.pop(); 
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') continue;
              try {
                const data = JSON.parse(dataStr);
                const part = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (part) {
                  botContent += part;
                  currentBotMsgEl.innerHTML = parseMd(botContent);
                  msgArea.scrollTop = msgArea.scrollHeight;
                }
              } catch (e) {
                // Fragmented JSON, will stay in buffer
              }
            }
          }
        }
        
        history.push({ role: "model", parts: [{ text: botContent }] });
      } catch (err) { 
        setTyping(false); 
        if (currentBotMsgEl) currentBotMsgEl.innerHTML = "Sorry, I encountered an error. Please try again."; 
        else appendMsg("Error occurred.", "bot");
      }
    }

    function createBotMsgEl() {
      const m = document.createElement('div'); m.className = `ai-chat-msg bot`;
      m.innerHTML = '<span style="opacity:0.3">thinking...</span>';
      msgArea.appendChild(m); msgArea.scrollTop = msgArea.scrollHeight;
      return m;
    }

    function appendMsg(t, s) {
      const m = document.createElement('div'); m.className = `ai-chat-msg ${s}`;
      m.innerHTML = s === 'bot' ? parseMd(t) : t;
      msgArea.appendChild(m); msgArea.scrollTop = msgArea.scrollHeight;
    }

    function setTyping(t) {
      isTyping = t; typing.classList.toggle('active', t);
      if (t) { msgArea.appendChild(typing); msgArea.scrollTop = msgArea.scrollHeight; }
    }

    function parseMd(t) { 
        if (!t) return "";
        // Clean markdown for streaming: Replace ** with bold, handles newlines
        let html = t
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n/g, '<br>');
        return '<p>' + html + (html.endsWith('</p>') ? '' : '</p>'); 
    }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
