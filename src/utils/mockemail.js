import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'src', 'logs'); // ✅ Always from root
const logPath = path.join(logDir, 'email.log');

export const sendMockEmail = async ({ to, subject, text }) => {
  try {
    // Ensure logs folder exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const content = `To: ${to}\nSubject: ${subject}\n\n${text}\n\n---\n`;

    fs.appendFileSync(logPath, content, 'utf8');
    console.log(`[MOCK EMAIL] Reset link sent to ${to}`);
  } catch (error) {
    console.error('Failed to write mock email:', error.message);
  }
};
