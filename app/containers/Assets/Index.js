import React, { useState, useEffect, useRef, useCallback } from 'react';
import assetsService from '../../services/assetsService';
import withAuth from '../../components/redux/providers/withAuth';
import AssetModal from './Modals/AssetModal';
import DepositModal from './Modals/DepositModal';
import Pagination from '../../components/common/base/Pagination';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Assets = (params) => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [data, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState(undefined)
  const [itemModalShow, setItemModalShow] = useState(false)
  const [depositWithdrawModalShow, setDepositModalShow] = useState(false)

  useEffect(() => {
    getData()
  }, [page, pageSize])

  const getData = () => {
    setLoading(true)

    assetsService
      .getAssets(page, pageSize)
      .then((res) => {
        console.log(res.data.items);
        setData(res.data.items)
        setTotalPages(res.data.total_pages)
        setPageSize(res.data.total_items)

      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      });
  };

  const handleShow = (item) => {
    setSelectedItem(item)
    setItemModalShow(true)
  };

  const handleShowDepositModal = () => {
    setDepositModalShow(true)
  };

  const handlePageChange = useCallback((page_) => {
    setPage(page_)
  }, []);

  const handleCloseModal = useCallback(() => {
    setItemModalShow(false)
    setDepositModalShow(false)
  }, [])

  const handleCloseModalAndReload = useCallback(() => {
    setItemModalShow(false)
    setDepositModalShow(false)
    getData()
  }, [])


  return (
    <div className="flex flex-col">
      <div className="page-title-container">
        <span className="page-title">Assets</span>
        <a className='btn-primary text-center !w-28' onClick={() => handleShowDepositModal()}>Deposit</a>
      </div>

      <div className="box">
        {data && data.length > 0 ? (
          <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
            <div className="w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-left w-8">#</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Plan</th>
                    <th className="text-left">Staked At</th>
                    <th className="text-center">Remaining Days</th>
                    <th className="text-left">Release Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <TableRow
                      key={`user-assets-table-item-${index}`}
                      item={item}
                      rowNumber={index + 1 + (page - 1) * pageSize}
                      onClick={() => handleShow(item)}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="7" className="pagination-cell">
                      <Pagination
                        totalPages={totalPages}
                        onChange={handlePageChange}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : (
          <span className="flex items-center justify-center h-40">
            No Records!
          </span>
        )}
      </div>
      <AssetModal
        open={itemModalShow}
        data={selectedItem}
        onClose={handleCloseModal}
        onCloseAndReload={handleCloseModalAndReload}
      />
      <DepositModal
        open={depositWithdrawModalShow}
        onClose={handleCloseModal}
        onCloseAndReload={handleCloseModalAndReload}
      />
    </div>
  );

}

export default withAuth(Assets);

const TableRow = (props) => {
  const { item, rowNumber, onClick } = props;

  return (
    <tr onClick={onClick} className="cursor-pointer">
      <td className="">{rowNumber}</td>
      <td className="text-center">{item.status}</td>
      <td className="text-left font-semibold">{item.amount}</td>
      <td className="text-left">{item.plan?.name}</td>
      <td className="text-left">{item.staked_at}</td>
      <td className="text-center">
        {item.release_date && (
          <div className="w-16 mx-auto text-center">
            <CircularProgressbar
              value={item.remaining}
              maxValue={item.plan.days}
              text={item.remaining}
              styles={progressbarStyle}
            />
          </div>
        )}
      </td>
      <td className="text-left">{item.release_date}</td>
    </tr>
  );
};

const progressbarStyle = buildStyles({
  // Rotation of path and trail, in number of turns (0-1)
  rotation: 0.25,

  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
  strokeLinecap: 'butt',
  width: 100,
  // Text size
  textSize: '18px',

  // How long animation takes to go from one percentage to another, in seconds
  pathTransitionDuration: 0.5,

  // Can specify path transition in more detail, or remove it entirely
  // pathTransition: 'none',

  // Colors
  // pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
  textColor: '#f88',
  trailColor: '#d6d6d6',
  backgroundColor: '#3e98c7',
});
