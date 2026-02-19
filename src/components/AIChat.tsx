import { useState } from "react";
import { safeAI } from "@/lib/ai-utils";

interface AIChatProps {
    model?: any;
    prompt?: string;
}

export default function AIChat({ model, prompt = "Hello" }: AIChatProps) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const runAI = async () => {
        if (!model) {
            setText("AI model not ready.");
            return;
        }

        setLoading(true);

        const result = await safeAI(() =>
            model.generateContent(prompt)
        );

        setLoading(false);

        if (!result) {
            setText("⚠️ AI is temporarily unavailable.");
            return;
        }

        // @ts-ignore - response structure depends on specific client
        const output = result?.response?.text?.();

        if (!output) {
            setText("AI returned empty response.");
            return;
        }

        setText(output);
    };

    return (
        <div className="p-4 border rounded-xl bg-card shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">AI Assistant</h3>
            <button
                onClick={runAI}
                disabled={loading}
                className="btn-cta w-full"
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

            {text && (
                <div className="p-3 rounded-lg bg-secondary text-sm leading-relaxed">
                    {text}
                </div>
            )}
        </div>
    );
}
