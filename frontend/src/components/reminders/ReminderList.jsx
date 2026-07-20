import { formatDateTime, toSafeDate } from "../../utils/date";
import { getCategoryStyle } from "../../utils/ui";

const CATEGORY_OPTIONS = ["All", "Work", "Personal", "Study", "Other"];

const ReminderList = ({
  reminders,
  loading,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
  setSelectedDate,
  showMobileFilters,
  setShowMobileFilters,
  onEdit,
  onDelete,
}) => {
  return (
    <section className="app-card w-full p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold app-text-heading">
          Reminders
        </h2>

        <div className="flex items-center gap-2 text-xs">
          {/* Desktop Filters */}
          <div className="app-filter-bar hidden sm:flex">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "app-filter-pill-active"
                    : "app-filter-pill-inactive"
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filters */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setSelectedCategory("All")}
              className={
                selectedCategory === "All"
                  ? "app-filter-pill-active"
                  : "app-filter-chip"
              }
            >
              All
            </button>

            <button
              onClick={() =>
                setShowMobileFilters((v) => !v)
              }
              className="app-filter-chip ml-2"
            >
              Others ▼
            </button>

            {showMobileFilters && (
              <div className="app-dropdown">
                {CATEGORY_OPTIONS.filter(
                  (c) => c !== "All"
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowMobileFilters(false);
                    }}
                    className="app-dropdown-item"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Date */}
      {selectedDate && (
        <button
          onClick={() => setSelectedDate(null)}
          className="app-link mb-3 text-xs"
        >
          Clear date ({selectedDate})
        </button>
      )}

      {/* Content */}
      {loading ? (
        <p className="app-text-muted">
          Loading reminders...
        </p>
      ) : reminders.length === 0 ? (
        <p className="app-text-muted">
          No reminders found.
        </p>
      ) : (
        <ul className="space-y-3">
          {reminders.map((rem) => {
            const date = toSafeDate(rem);

            return (
              <li
                key={rem._id}
                className="app-list-item flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium break-words">
                      {rem.title}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${getCategoryStyle(
                        rem.category
                      )}`}
                    >
                      {rem.category || "Other"}
                    </span>
                  </div>

                  {rem.description && (
                    <p className="app-text-muted text-xs break-words">
                      {rem.description}
                    </p>
                  )}

                  <p className="app-text-muted text-xs">
                    {formatDateTime(date)}
                  </p>
                </div>

                <div className="flex gap-2 self-start sm:self-center">
                  <button
                    onClick={() => onEdit(rem)}
                    className="btn-edit-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(rem._id)}
                    className="btn-danger-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ReminderList;