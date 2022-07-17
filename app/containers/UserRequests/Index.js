import React, { useState, useEffect, useRef } from 'react';
import userRequestsService from '../../services/userRequestsService';
import withAuth from '../../components/redux/providers/withAuth';
import Modal from './Modals/Modal';
// import { ActionCable } from 'actioncable-client-react';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import Pagination from '../../components/common/base/Pagination';
import RequestSideName from '../../components/common/base/RequestSideName';
import UserRequestStatusName from '../../components/common/base/UserRequestStatusName';
import Currency from '../../components/common/base/Currency';
import Price from '../../components/common/base/Price';

class UserRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalShow: false,
      selectedId: undefined,
      page: 1,
      pageSize: 10,
      totalPages: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.getData('USDT');
  }

  getData = () => {
    this.setState({ loading: true });

    const { page, pageSize } = this.state;

    userRequestsService
      .getAll(page, pageSize)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data.items,
          totalPages: res.data.total_pages,
          totalItems: res.data.total_items,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleAdd = () => {
    this.setState({ modalShow: true, selectedId: undefined });
  };

  handleEdit = (id) => {
    this.setState({ modalShow: true, selectedId: id });
  };

  handlePageChange = (page) => {
    this.setState({ page }, () => this.getData());
  };

  render() {
    const {
      data,
      loading,
      page,
      pageSize,
      totalPages,
      modalShow,
      selectedId,
    } = this.state;
    return (
      <div className="flex flex-col">
        <div className="page-title-container">
          <span className="page-title">User Requests</span>
        </div>

        <div className="box">
          {data && data.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
              <div className="w-full overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left w-8">#</th>
                      <th className="text-center">Order Type</th>
                      <th className="text-left">Currency</th>
                      <th className="text-left">Amount</th>
                      <th className="text-left">Created At</th>
                      <th className="text-left">Confirmed At</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <TableRow
                        key={`log-exchange-table-item-${index}`}
                        item={item}
                        rowNumber={index + 1 + (page - 1) * pageSize}
                        handleEdit={(id) => this.handleEdit(id)}
                      />
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="7" className="pagination-cell">
                        <Pagination
                          totalPages={totalPages}
                          onChange={(page) => this.handlePageChange(page)}
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
        <Modal
          open={modalShow}
          id={selectedId}
          onClose={() => this.setState({ modalShow: false })}
          onCloseAndReload={() => {
            this.setState({ modalShow: false, selectedId: undefined }, () => {
              this.getData();
            });
          }}
        />
      </div>
    );
  }
}

export default withAuth(UserRequests);

const TableRow = (props) => {
  const { item, rowNumber } = props;

  return (
    <tr>
      <td className="">{rowNumber}</td>
      <td className="text-center">
        <RequestSideName id={item.side} />
      </td>
      <td className="text-left">
        <Currency symbol={item.currency.symbol} />
      </td>

      <td className="text-left font-semibold">{item.amount}</td>
      <td className="text-left">{item.placed_at}</td>
      <td className="text-left">{item.request_confirmed_at || '-'}</td>
      <td className="text-center">
        <UserRequestStatusName id={item.status} />
      </td>
    </tr>
  );
};
