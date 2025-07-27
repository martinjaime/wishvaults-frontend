import React from "react"
import { IconButton } from "components/Button"
import Input from "components/Input"
import styled from "styled-components"

const WishlistItemDiv = styled.div`
  border: 2px solid var(--border-light);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background: var(--bg-card);

  .item-header {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item-description,
  .item-url {
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    .item-details {
      flex-direction: row;
      gap: 12px;
    }

    .item-description,
    .item-url {
      flex: 1;
    }
  }
`;

export interface WishlistItemData {
  title: string
  description?: string
  url?: string
}

interface WishlistItemProps {
  id: string
  item: WishlistItemData
  index: number
  onUpdate: (index: number, field: keyof WishlistItemData, value: string) => void
  onRemove: (index: number) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  canRemove: boolean
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  item,
  index,
  onUpdate,
  onRemove,
  onKeyDown,
  canRemove,
}) => {
  return (
    <WishlistItemDiv>
      <div className="item-header">
        <Input
          id={id}
          value={item.title}
          onChange={(value) => onUpdate(index, "title", value)}
          placeholder={`item ${index + 1} title`}
          onKeyDown={onKeyDown}
          required
        />
        {canRemove && (
          <IconButton tabIndex={-1} onClick={() => onRemove(index)} aria-label="Remove wishlist item">
            ×
          </IconButton>
        )}
      </div>

      <div className="item-details">
        <Input
          value={item.description || ""}
          onChange={(value) => onUpdate(index, "description", value)}
          placeholder="description (optional)"
          className="item-description"
          onKeyDown={onKeyDown}
        />
        <Input
          type="url"
          value={item.url || ""}
          onChange={(value) => onUpdate(index, "url", value)}
          placeholder="URL (optional)"
          className="item-url"
          onKeyDown={onKeyDown}
        />
      </div>
     </WishlistItemDiv>
  )
}

export default WishlistItem
