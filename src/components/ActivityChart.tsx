import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  hourlyTimeSpent: { [key: string]: number };
};

export function ActivityChart({ hourlyTimeSpent }: Props) {
  const data = Object.entries(hourlyTimeSpent).map(([hour, seconds]) => ({
    hour,
    timeSpent: convertToMinutes(seconds),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }} // Adds margin to center the chart better
      >
        <XAxis dataKey="hour" />
        <YAxis
          type="number"
          minTickGap={10}
          domain={[12, 60]} // Adjusts Y-axis to start at 12 and end at max data value
          tickFormatter={formatYAxisTick}
        />
        <Line type="monotone" dataKey="timeSpent.minutes" stroke="#2563eb" dot={false} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Convert seconds to total minutes and remaining seconds
function convertToMinutes(seconds: number): { minutes: number; remainingSeconds: number } {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return { minutes, remainingSeconds }; // Return both minutes and remaining seconds
}

type PayloadItem = {
  hour: string;
  timeSpent: { minutes: number; remainingSeconds: number }; // Update to reflect the new structure
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: { payload: PayloadItem }[]; // The payload is an array of objects containing the payload property
};

// Custom tooltip to display hour, minutes, and seconds
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { hour, timeSpent } = payload[0].payload; // Get hour and timeSpent from payload
    const formattedHour = formatHour(hour); // Format hour into 12-hour format

    return (
      <div
        style={{
          backgroundColor: "#131313",
          color: "#ffffff",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>{formattedHour}</p>
        <p>{`${timeSpent.minutes}m ${timeSpent.remainingSeconds}s`}</p>{" "}
        {/* Display time spent in minutes and seconds */}
      </div>
    );
  }

  return null;
};

// Function to format hour into 12-hour format
function formatHour(hour: string): string {
  const hourNum = parseInt(hour, 10);
  const period = hourNum < 12 ? "AM" : "PM";
  const formattedHour = hourNum % 12 || 12; // Convert 0-23 to 1-12
  return `${formattedHour} ${period}`;
}

const formatYAxisTick = (value: number) => {
  return `${Math.floor(value)}`; // Convert the number to string and return only the whole number part
};
