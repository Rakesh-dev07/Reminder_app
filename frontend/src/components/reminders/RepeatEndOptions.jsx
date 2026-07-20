import React from "react";

const RepeatEndOptions = ({
  endType,
  endDate,
  occurrences,
  onEndTypeChange,
  onEndDateChange,
  onOccurrencesChange,
  error = {},
}) => {
  return (
    <div className="app-panel-inset">
      <h3 className="text-sm font-semibold">
        Ends
      </h3>

      {/* Never */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="endType"
          value="never"
          checked={endType === "never"}
          onChange={() => onEndTypeChange("never")}
        />

        <span className="text-sm">Never</span>
      </label>

      {/* End Date */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="endType"
          value="date"
          checked={endType === "date"}
          onChange={() => onEndTypeChange("date")}
        />

        <span className="text-sm">On Date</span>
      </label>

      {endType === "date" && (
        <div className="ml-6 space-y-1">
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="app-input"
          />

          {error.endDate && (
            <p className="text-sm text-red-500">
              {error.endDate}
            </p>
          )}
        </div>
      )}

      {/* Occurrences */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="endType"
          value="occurrences"
          checked={endType === "occurrences"}
          onChange={() => onEndTypeChange("occurrences")}
        />

        <span className="text-sm">
          After Number of Occurrences
        </span>
      </label>

      {endType === "occurrences" && (
        <div className="ml-6 space-y-1">
          <input
            type="number"
            min={1}
            value={occurrences}
            onChange={(e) =>
              onOccurrencesChange(e.target.value)
            }
            placeholder="10"
            className="app-input"
          />

          {error.occurrences && (
            <p className="text-sm text-red-500">
              {error.occurrences}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RepeatEndOptions;