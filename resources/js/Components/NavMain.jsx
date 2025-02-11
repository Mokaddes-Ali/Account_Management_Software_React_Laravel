import { useState } from "react";

export function NavMain({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <nav className="space-y-2">
      {items.map((item, index) => (
        <div key={index}>
          <button
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200"
            onClick={() => handleToggle(index)}
          >
            <span className="flex items-center">
              <item.icon className="mr-2 h-5 w-5" />
              {item.title}
            </span>
            <span>{openIndex === index ? "🔽" : "▶"}</span>
          </button>

          {openIndex === index && item.items && (
            <ul className="ml-6 mt-1 space-y-1">
              {item.items.map((subItem, subIndex) => (
                <li key={subIndex} className="p-1 hover:bg-gray-100 rounded">
                  <a href={subItem.url}>{subItem.title}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
