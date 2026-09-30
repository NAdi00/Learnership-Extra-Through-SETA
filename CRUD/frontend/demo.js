fetch("http://localhost:5000/jobs")
    .then(res => res.text())
    .then(data => {
        console.log(data);
    });