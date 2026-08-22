export function GenericPageHeader() {
    const header = document.createElement('header');

    header.innerHTML = `
        <div className="w-full rounded-md shadow-md">
            <div className="flex justify-between p-4">
                <h2 className="text-lg font-bold italic">
                    Sending requests with X-Api-Key header
                </h2>
                <div className="flex"></div>
            </div>
        </div>
  `;

    return header;
}