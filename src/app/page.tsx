"use client";
import React, { useState, useEffect } from "react";
import { Share2, Grid, List, Search, X } from "lucide-react";
import { ModeToggle } from "@/components/ModeTogle";
import unitube from "@/assets/unitube.png";

type Video = {
  id: string;
  title: string;
  source: string; // YouTube embed link
};

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (video: Video) => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: `Check out this video: ${video.title}`,
          url: video.source,
        });
      } else {
        await navigator.clipboard.writeText(video.source);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const sampleVideos: Video[] = [
    {
      id: "1",
      title: "Abertura de Chamado: Impressoras - Secretaria",
      source: "https://www.youtube.com/embed/q_ey0J6C65k?si=_9GR9Nnw0RCgtg34", // link do embed
    },
     {
      id: "2",
      title: "Impressoras: Página de Status - Secretaria",
      source: "https://www.youtube.com/embed/N3lcsG7lVf0?si=yGN1On5b1SItlcqb", // link do embed
    },
    {
      id: "3",
      title: "Orientações Para o Atendimento Telefônico - Secretaria",
      source: "https://www.youtube.com/embed/4CszoYhH-X8?si=8b0f4deRIpdSLb_z", // link do embed
    },
    {
      id: "4",
      title: "Acompanhando o E-mail institucional do curso - Secretaria",
      source: "https://www.youtube.com/embed/0L5Ac6KszhA?si=UkW-rtiu43eFTo-d", // link do embed
    },
    {
      id: "5",
      title: "Calendário de Provas: Primeira Chamada - Secretaria",
      source: "https://www.youtube.com/embed/07zgnJYMHwU?si=IltkctLfbQKx64Tk", // link do embed
    },
    {
      id: "6",
      title: "Registro de Certificados - UNIPEX Secretaria",
      source: "https://www.youtube.com/embed/c19eqS4jBLE?si=KeQJVSQDQcbkNANy", // link do embed
    },
    {
      id: "7",
      title: "CME - CHECK IN | CHECK OUT - PARTE 1 - UNIPEX Secretaria",
      source: "https://www.youtube.com/embed/k14SSY6e7X0?si=ws2rDYtUaCKvtaFZ", // link do embed
    },
    {
      id: "8",
      title: "CME - CHECK IN | CHECK OUT - PARTE 2 - UNIPEX Secretaria",
      source: "https://www.youtube.com/embed/lr0_g3X3QDc?si=bprNOGe76Rwqh_VN", // link do embed
    },
  ];

  useEffect(() => {
    const filtered = sampleVideos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchQuery]);

  return (
    <div className="min-h-screen dark:bg-[#1F1D2B] bg-blue-50">
      <header className="rounded-xl ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div className="mb-2 dark:bg-transparent bg-blue-500 rounded-md mx-auto md:hidden">
              <img src={unitube.src} alt="UniTube Logo" className="w-48 mt-1 ml-1" />
            </div>
            <div className="flex space-x-4 items-center">
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar vídeos..."
                  className="w-full sm:w-96 pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Grid size={25} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <List size={25} />
              </button>
              <div className="flex justify-center items mt-1">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
  <h1 className="text-5xl font-semibold dark:text-white text-blue-500">EXPLORE E APRENDA!</h1>
  <p className="text-sm text-slate-400 mb-10 mt-2">
    Tutoriais rápidos e práticos para dominar os sistemas da Unichristus
  </p>

  {viewMode === "grid" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {filteredVideos.map((video) => (
        <div
          key={video.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border"
        >
          <iframe
            src={video.source}
            title={video.title}
            className="w-full"
            style={{ aspectRatio: "16/9" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {video.title}
            </h3>
            <button
              onClick={() => handleShare(video)}
              disabled={isSharing}
              className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ${
                isSharing ? "animate-pulse" : ""
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-2`}
              title="Share video"
            >
              <Share2 className={`w-5 h-5 ${isSharing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col space-y-4 mt-6">
      {filteredVideos.map((video) => (
        <div
          key={video.id}
          className="flex flex-col sm:flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border"
        >
          <iframe
            src={video.source}
            title={video.title}
            className="w-full sm:w-full"
            style={{ aspectRatio: "16/9" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="p-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {video.title}
            </h3>
            <button
              onClick={() => handleShare(video)}
              disabled={isSharing}
              className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ${
                isSharing ? "animate-pulse" : ""
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-2`}
              title="Share video"
            >
              <Share2 className={`w-5 h-5 ${isSharing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</main>
    </div>
  );
}