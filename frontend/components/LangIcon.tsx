import { getLangIconUrl } from "@/lib/LangIcons";

export default function LangIcon({ language }: { language: string }) {
  const url = getLangIconUrl(language);

  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="h-5 w-5"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
      )}
    </span>
  );
}