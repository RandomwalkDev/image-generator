import { useState } from "react";

function App() {
  const [url, setUrl] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/generate-gif", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-[#7D3E28] mb-6 text-center absolute top-2 left-5">
        Image Generator
      </h1>
      <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-8 w-full max-w-2xl">
        {url && (
          <div className="mb-6 flex justify-center">
            <img
              src={url}
              alt="Generated Image"
              className="rounded-lg shadow-md w-64 h-64 object-cover border-4 border-[#FF9E7B]"
            />
          </div>
        )}

        <textarea
          name="prompt"
          id="prompt"
          value={prompt}
          onChange={handleChange}
          placeholder="Enter a prompt to generate an Image..."
          className="w-full p-3 rounded-lg bg-white/30 text-[#7D3E28] placeholder-[#7D3E28]/50 outline-none border-2 border-[#FF9E7B] resize-none"
          rows={4}
        />

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full mt-6 bg-[#FF7F50] hover:bg-[#E66B40] text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>

        {url && (
          <a
            href={url}
            download="generated_image.gif"
            className="w-full mt-4 bg-[#7D3E28] hover:bg-[#5A2D1D] text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-center block"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
