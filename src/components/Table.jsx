const Table = ({ itemList, userId }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th className="table-header">#</th>
                        <th className="table-header">Restaurant Name</th>
                        <th className="table-header">Description</th>
                        <th className="table-header">City</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList
                        ? itemList.map((item, index) => {
                            if (userId === item.userId) {
                                return (
                                    <tr key={index}>
                                        <td className="table-data">
                                            {index + 1}
                                        </td>
                                        <td className="table-name">
                                            {item.name}
                                        </td>
                                        <td className="table-desc">
                                            {item.description}
                                        </td>
                                        <td className="table-city">
                                            {item.city}
                                        </td>
                                    </tr>
                                );
                            }
                            return;
                        })
                        : null}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
