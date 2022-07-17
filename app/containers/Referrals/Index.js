import React, { useState, useEffect, useRef } from 'react';
import profileService from '../../services/profileService';
import withAuth from '../../components/redux/providers/withAuth';
import Modal from './Modals/Modal';
import Pagination from '../../components/common/base/Pagination';

class Referrals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalShow: false,
      selected: undefined,
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

    profileService
      .getUserReferrals(page, pageSize)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data,
          // totalPages: res.data.total_pages,
          // totalItems: res.data.total_items,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleAdd = () => {
    this.setState({ modalShow: true, selected: undefined });
  };

  handleShow = (item) => {
    console.log(item);
    this.setState({ modalShow: true, selected: item });
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
      selected,
    } = this.state;
    return (
      <div className="flex flex-col">
        <div className="page-title-container">
          <span className="page-title">Referrals</span>
        </div>

        <div className="box">
          {data && data.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
              <div className="w-full overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left w-8">#</th>
                      <th className="text-center">Email</th>
                      <th className="text-center"># Referred User</th>
                      <th className="text-center">Register Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <TableRow
                        key={`user-assets-table-item-${index}`}
                        item={item}
                        rowNumber={index + 1 + (page - 1) * pageSize}
                        onClick={() => this.handleShow(item)}
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
          data={selected}
          onClose={() => this.setState({ modalShow: false })}
          onCloseAndReload={() => {
            this.setState({ modalShow: false, selected: undefined }, () => {
              this.getData();
            });
          }}
        />
      </div>
    );
  }
}

export default withAuth(Referrals);

const TableRow = (props) => {
  const { item, rowNumber, onClick } = props;

  return (
    <tr
    //  onClick={onClick}
    // className="cursor-pointer"
    >
      <td className="">{rowNumber}</td>
      <td className="text-center">{item.email}</td>
      <td className="text-center">{item.referrals.length}</td>
      <td className="text-center">{item.register_date}</td>
    </tr>
  );
};
