/**
 * Retries a Gemini AI call with exponential backoff
 */
export async function callGeminiWithRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        if (retries === 0) throw err;
        await new Promise(r => setTimeout(r, 1500));
        return callGeminiWithRetry(fn, retries - 1);
    }
}

/**
 * Safe wrapper for AI calls to prevent application crashes
 */
export async function safeAI<T>(fn: () => Promise<T>): Promise<T | null> {
    try {
        return await fn();
    } catch (error) {
        console.error("AI service error caught in safeAI wrapper:", error);
        return null;
    }
}
