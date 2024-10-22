import React from "react";
import { useSelector } from "react-redux";
import { selectResults } from "../store/calculatorSlice";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const NTFResults: React.FC = () => {
  const results = useSelector(selectResults);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>NTF Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Selected NTF Model:</strong>{" "}
            {results.selectedNTFModel || "No model selected"}
          </p>
          {results.ntfUtilizationRate !== null && results.ntfUtilizationRate !== undefined ? (
            <p>
              <strong>Utilization Rate:</strong>{" "}
              {results.ntfUtilizationRate.toFixed(2)}%
            </p>
          ) : (
            <p>
              <strong>Utilization Rate:</strong> Not available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NTFResults;