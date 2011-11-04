module.exports.createContactModel = function(connection) {

	var collection;

	connection.collection('contact', function(error, contactCollection) {
		collection = contactCollection;
	});

	function readByEmailAddress(emailAddress, callback) {
		collection.find({emailAddress: emailAddress}).toArray(function(error, contacts) {
			callback(error, contacts[0]);
		});
	}

	return {
		readByEmailAddress: readByEmailAddress
	};
};