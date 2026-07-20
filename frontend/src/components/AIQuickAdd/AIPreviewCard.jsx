import {
  CalendarDays,
  Clock3,
  Repeat,
  Tag,
  TriangleAlert,
  CircleAlert,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AIPreviewCard({
  reminder,
  aiInfo,
  onReview,
}) {
  if (!reminder) return null;

  const confidence = Math.round(
    (aiInfo?.confidence ?? 0) * 100
  );

  const confidenceUI =
    confidence >= 90
      ? {
          label: "High Confidence",
          className:
            "bg-green-500/15 text-green-400 border border-green-500/20",
        }
      : confidence >= 70
      ? {
          label: "Medium Confidence",
          className:
            "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
        }
      : {
          label: "Low Confidence",
          className:
            "bg-red-500/15 text-red-400 border border-red-500/20",
        };

  return (
    <div className="app-ai-preview">
      <div className="app-ai-preview-header">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <CheckCircle2
              size={20}
              className="text-emerald-400"
            />

            <h3 className="font-semibold text-white">
              AI understood your reminder
            </h3>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${confidenceUI.className}`}
          >
            {confidence}% • {confidenceUI.label}
          </span>

        </div>

      </div>

      {/* Summary */}

      <div className="px-5 pt-5">

        <div className="flex items-start gap-3">

          <Sparkles
            size={18}
            className="mt-1 text-indigo-400"
          />

          <div>

            <p className="app-text-muted text-xs uppercase tracking-wide">
              Reminder
            </p>

            <h4 className="mt-1 text-lg font-semibold text-white">
              {reminder.title}
            </h4>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="mt-5 space-y-4 px-5">

        <Detail
          icon={<CalendarDays size={18} />}
          label="Starts"
          value={formatDate(reminder.date)}
        />

        <Detail
          icon={<Clock3 size={18} />}
          label="Time"
          value={formatTime(reminder.time)}
        />

        <Detail
          icon={<Repeat size={18} />}
          label="Repeats"
          value={formatRepeat(reminder)}
        />

        <Detail
          icon={<Tag size={18} />}
          label="Category"
          value={reminder.category}
        />

      </div>

      {/* Missing */}

      {aiInfo?.missingFields?.length > 0 && (

        <div className="mx-5 mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">

          <div className="flex gap-3">

            <TriangleAlert
              size={18}
              className="mt-1 text-yellow-400"
            />

            <div>

              <h4 className="font-medium text-yellow-300">
                {getMissingTitle(aiInfo.missingFields)}
              </h4>

              <p className="mt-1 text-sm text-yellow-200/80">
                {getMissingDescription(aiInfo.missingFields)}
              </p>

            </div>

          </div>

        </div>

      )}

      {/* Warnings */}

      {aiInfo?.warnings?.length > 0 && (

        <div className="mx-5 mt-4 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">

          <div className="flex gap-3">

            <CircleAlert
              size={18}
              className="mt-1 text-orange-400"
            />

            <div>

              <h4 className="font-medium text-orange-300">
                AI Assumptions
              </h4>

              <ul className="mt-2 space-y-1 text-sm text-orange-200">

                {aiInfo.warnings.map((warning) => (
                  <li key={warning}>
                    • {warning}
                  </li>
                ))}

              </ul>

            </div>

          </div>

        </div>

      )}

      {/* Footer */}

      <div className="app-ai-preview-footer">
        <p className="app-text-muted mb-3 text-sm">
          Review before saving.
        </p>

        <button
          onClick={onReview}
          className="btn-primary-lg"
        >
          Review & Edit
        </button>

      </div>

    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="text-indigo-400">
        {icon}
      </div>

      <div>

        <p className="app-text-muted text-xs uppercase tracking-wide">
          {label}
        </p>

        <p className="font-medium text-white">
          {value}
        </p>

      </div>

    </div>
  );
}

function formatDate(date) {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function formatTime(time) {
  if (!time) return "Not specified";

  const [h, m] = time.split(":");

  return new Date(
    2000,
    0,
    1,
    h,
    m
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatRepeat(reminder) {
  if (
    reminder.repeat === "none" ||
    !reminder.repeat
  )
    return "Does not repeat";

  if (
    reminder.repeat === "weekly" &&
    reminder.repeatDays?.length
  ) {
    return `Every ${reminder.repeatDays.join(", ")}`;
  }

  if (reminder.repeat === "daily")
    return "Every day";

  if (reminder.repeat === "monthly")
    return "Every month";

  if (reminder.repeat === "yearly")
    return "Every year";

  return reminder.repeat;
}

function getMissingTitle(fields) {
  if (fields.includes("date"))
    return "First occurrence date required";

  if (fields.includes("time"))
    return "Reminder time required";

  return "Additional information required";
}

function getMissingDescription(fields) {
  if (fields.includes("date"))
    return "The AI understood the schedule but couldn't determine when it should start.";

  if (fields.includes("time"))
    return "The reminder doesn't include a specific time.";

  return "Please review the reminder before saving.";
}