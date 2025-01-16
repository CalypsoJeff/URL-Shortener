import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaLink } from "react-icons/fa";

interface ShortenedUrl {
  originalUrl: string;
  shortId: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  exp: number;
}

function ShortUrlManager() {
  const [shortenedList, setShortenedList] = useState<ShortenedUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [latestShortUrl, setLatestShortUrl] = useState<ShortenedUrl | null>(
    null
  );

  useEffect(() => {
    const fetchShortenedUrls = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("User is not authenticated.");

        const decoded: JwtPayload = jwtDecode(token);
        const userId = decoded.sub;

        const response = await axios.get(
          `${config.baseURL}/users/${userId}/urls`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setShortenedList(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch shortened URLs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShortenedUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("User is not authenticated.");

      const response = await axios.post(
        `${config.baseURL}/shorten-url`,
        { originalUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newShortenedUrl: ShortenedUrl = {
        originalUrl: response.data.originalUrl,
        shortId: response.data.shortId,
      };

      setLatestShortUrl(newShortenedUrl);
      setShortenedList((prevList) => [newShortenedUrl, ...prevList]);
      setOriginalUrl("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to shorten the URL");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-6">
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        {/* Shorten URL Form */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-4">
            <FaLink className="text-blue-500 text-3xl mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Shorten Your URL
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original URL
              </label>
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold shadow hover:shadow-lg transform hover:scale-105 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Shorten URL
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>

          {/* Latest Shortened URL Section with Fixed Width */}
          {latestShortUrl && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FaLink className="text-blue-500 mr-2" />
                  Latest Shortened URL
                </h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm overflow-hidden">
                    <a
                      href={`${config.baseURL}/shorten-url/${latestShortUrl.shortId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
                    >
                      <span className="mr-2 flex-shrink-0">🔗</span>
                      <span className="break-all">
                        {config.baseURL}/shorten-url/{latestShortUrl.shortId}
                      </span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        ↗
                      </span>
                    </a>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="block text-gray-500 mb-1 text-xs uppercase font-medium">
                      Original URL:
                    </span>
                    <span className="text-sm text-gray-600 break-all block">
                      {latestShortUrl.originalUrl}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shortened URLs List */}
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 p-4 border-b">
            Your Shortened URLs
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <p className="p-4">Loading shortened URLs...</p>
            ) : shortenedList.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {shortenedList.map((url) => (
                  <li key={url.shortId} className="p-4">
                    <a
                      href={`${config.baseURL}/shorten-url/${url.shortId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {config.baseURL}/shorten-url/{url.shortId}
                    </a>
                    <p className="text-gray-600 break-all">{url.originalUrl}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4">No shortened URLs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortUrlManager;
