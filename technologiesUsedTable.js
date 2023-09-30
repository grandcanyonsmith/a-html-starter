function populateTechUsed() {
    var techUsedHtml = `
        <table class="table">
            <thead>
                <tr>
                    <th>Technologies Used</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><i class="fas fa-cloud"></i> AWS Lambda</td>
                </tr>
                <tr>
                    <td><i class="fas fa-database"></i> AWS DynamoDB</td>
                </tr>
                <tr>
                    <td><i class="fas fa-server"></i> AWS EC2</td>
                </tr>
                <tr>
                    <td><i class="fas fa-code"></i> Terraform</td>
                </tr>
                <tr>
                    <td><i class="fas fa-brain"></i> OpenAI</td>
                </tr>
            </tbody>
        </table>`;
    document.getElementById('techUsed').innerHTML = techUsedHtml;
}