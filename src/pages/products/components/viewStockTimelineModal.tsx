import React from 'react';
import { Product } from '../../../shared/interfaces/product.interface';
import { Line } from 'react-chartjs-2';

interface ViewStockTimelineModalData {
  product: Product,
}

export const ViewStockTimelineModal: React.FC<ViewStockTimelineModalData> = ({ product }) => {
  const { stockTimeline } = product;

  let pointsData: number[] = [];
  let pointsLabels: string[] = [];

  stockTimeline?.forEach(item => {
    let date = new Date(item.date)
      .toLocaleDateString();

    pointsData.push(item.stock);
    pointsLabels.push(date);
  });

  const chartData = {
    labels: pointsLabels,
    datasets: [{
      data: pointsData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    legend: {
      display: false
    }
  };

  return (
    <div className="modal fade" id="viewStockTimelineModal" tabIndex={-1} aria-labelledby="viewStockTimelineModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="viewStockTimelineModalLabel">View Stock Timeline</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <span className="font-weight-bold">Id:</span> <span>{product.id}</span>
            </div>
            <div>
              <span className="font-weight-bold">Name:</span> <span>{product.name}</span>
            </div>
            <div className="mt-3">
              {pointsData.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="alert alert-warning" role="alert">
                    No data available
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}