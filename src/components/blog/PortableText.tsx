import { Fragment, type ReactNode } from "react";
import type { JsonValue, PortableTextBlock, PortableTextSpan } from "@/lib/emdash-blog.server";

function safeHref(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 2048) return null;
  if (value.startsWith("/") || value.startsWith("#")) return value;
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeImageSrc(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 4096) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeSpan(value: number | undefined): number | undefined {
  return Number.isInteger(value) && value! >= 1 && value! <= 100 ? value : undefined;
}

function renderSpan(span: PortableTextSpan, defs: Array<Record<string, JsonValue>>): ReactNode {
  let content: ReactNode = span.text || "";
  for (const mark of span.marks || []) {
    if (mark === "strong") content = <strong>{content}</strong>;
    else if (mark === "em") content = <em>{content}</em>;
    else if (mark === "underline") content = <u>{content}</u>;
    else if (mark === "code") content = <code>{content}</code>;
    else {
      const definition = defs.find((entry) => entry._key === mark);
      const href = safeHref(definition?.href);
      if (href) {
        const external = href.startsWith("http");
        content = (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {content}
          </a>
        );
      }
    }
  }
  return (
    <Fragment key={span._key || `${span.text}-${(span.marks || []).join("-")}`}>{content}</Fragment>
  );
}

function blockChildren(block: PortableTextBlock): ReactNode {
  const defs = Array.isArray(block.markDefs) ? block.markDefs : [];
  return (block.children || []).map((span) => renderSpan(span, defs));
}

function TextBlock({ block }: { block: PortableTextBlock }) {
  const children = blockChildren(block);
  switch (block.style) {
    case "h1":
    case "h2":
      return <h2>{children}</h2>;
    case "h3":
      return <h3>{children}</h3>;
    case "h4":
      return <h4>{children}</h4>;
    case "blockquote":
      return <blockquote>{children}</blockquote>;
    default:
      return <p>{children}</p>;
  }
}

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  const output: ReactNode[] = [];
  for (let index = 0; index < value.length; index += 1) {
    const block = value[index];
    const key = block._key || `block-${index}`;

    if (block._type === "image") {
      const src = safeImageSrc(block.asset?.url);
      if (src) {
        output.push(
          <figure className="journal-prose__image" key={key}>
            <img src={src} alt={block.alt || ""} width={block.width} height={block.height} />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>,
        );
      }
      continue;
    }

    if (block._type === "code") {
      output.push(
        <pre key={key}>
          <code data-language={block.language}>{block.code || ""}</code>
        </pre>,
      );
      continue;
    }

    if (block._type === "break") {
      output.push(<hr key={key} />);
      continue;
    }

    if (block._type === "table" && Array.isArray(block.rows)) {
      output.push(
        <div className="journal-prose__table" key={key}>
          <table>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={row._key || `${key}-row-${rowIndex}`}>
                  {(row.cells || []).map((cell, cellIndex) => {
                    const Cell = cell.isHeader ? "th" : "td";
                    return (
                      <Cell
                        key={cell._key || `${key}-cell-${rowIndex}-${cellIndex}`}
                        colSpan={safeSpan(cell.colspan)}
                        rowSpan={safeSpan(cell.rowspan)}
                      >
                        {(cell.content || []).map((span) =>
                          renderSpan(span, cell.markDefs || block.markDefs || []),
                        )}
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (block._type !== "block") {
      console.warn("Unsupported Em Dash Portable Text block", block._type || "unknown");
      continue;
    }

    if (block.listItem) {
      const kind = block.listItem;
      const items: PortableTextBlock[] = [];
      while (
        index < value.length &&
        value[index]._type === "block" &&
        value[index].listItem === kind
      ) {
        items.push(value[index]);
        index += 1;
      }
      index -= 1;
      const listItems = items.map((item, itemIndex) => (
        <li key={item._key || `${key}-${itemIndex}`}>{blockChildren(item)}</li>
      ));
      output.push(
        kind === "number" ? <ol key={key}>{listItems}</ol> : <ul key={key}>{listItems}</ul>,
      );
      continue;
    }

    output.push(<TextBlock key={key} block={block} />);
  }
  return <div className="journal-prose">{output}</div>;
}
