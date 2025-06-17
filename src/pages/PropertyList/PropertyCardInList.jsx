import { useNavigate } from "react-router-dom";

// Helper function to format property type
const formatPropertyType = (type) => {
  const types = {
    standalone_villa: "Stand Alone Villa",
    apartment: "Apartment",
    chalet: "Chalet",
    twin_villa: "Twin Villa",
    duplex: "Duplex"
  };
  return types[type] || type;
};

// Helper function to format area range
const formatAreaRange = (range) => {
  const ranges = {
    "100_to_150": "100-150 m²",
    "150_to_200": "150-200 m²",
    "200_to_250": "200-250 m²",
    "250_to_300": "250-300 m²"
  };
  return ranges[range] || range;
};

// Helper function to format price range
const formatPriceRange = (range) => {
  const ranges = {
    "1_to_2_million": "1-2M",
    "2_to_3_million": "2-3M",
    "3_to_4_million": "3-4M",
    "4_to_5_million": "4-5M",
    "5_to_6_million": "5-6M"
  };
  return ranges[range] || range;
};

export default function PropertyCardInList({ 
  property, 
  hasImageError, 
  onImageError,
  onDelete 
}) {
  const navigate = useNavigate();

  return (
    <article
      className="relative flex gap-5 bg-[#002349] rounded-xl px-5 py-6 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
    >
      {/* thumbnail */}
      <div className="w-[496px] h-[290px] rounded-lg shrink-0 bg-[#001731] flex items-center justify-center overflow-hidden">
        {!property.images?.[0] || hasImageError ? (
          <div className="text-white text-center p-4">
            <p className="text-lg font-semibold">Image Not Available</p>
          </div>
        ) : (
          <img
            src={property.images[0]}
            alt={property.title || 'Property image'}
            className="w-full h-full object-cover rounded-lg"
            onError={() => onImageError(property._id)}
          />
        )}
      </div>

      {/* details + button */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-white text-2xl font-semibold mb-4">{property.title}</h3>
          <p className="text-white/80 mb-4">{property.description}</p>
          <ul className="text-white text-[12px] leading-[16px] space-y-[2px]">
            <li className="text-xl">
              <span className="font-semibold text-xl">ID: </span>
              {property._id}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Type: </span>
              {formatPropertyType(property.type)}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Area: </span>
              {formatAreaRange(property.areaRange)}
            </li>
            <li className="text-xl">
              <span className="font-semibold text-xl">Price: </span>
              {formatPriceRange(property.priceRange)}
            </li>
            {property.bedrooms && (
              <li className="text-xl">
                <span className="font-semibold text-xl">Bedrooms: </span>
                {property.bedrooms}
              </li>
            )}
            {property.bathrooms && (
              <li className="text-xl">
                <span className="font-semibold text-xl">Bathrooms: </span>
                {property.bathrooms}
              </li>
            )}
            <li className="text-xl">
              <span className="font-semibold text-xl">Status: </span>
              <span className={`capitalize ${property.status === 'available' ? 'text-green-400' : 'text-red-400'}`}>
                {property.status}
              </span>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 self-end mt-4">
          <button
            className="bg-white text-[#002349] text-xs font-semibold rounded-[4px] px-6 py-[4px]"
            onClick={() => navigate(`/edit-property/${property._id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white text-xs font-semibold rounded-[4px] px-6 py-[4px]"
            onClick={() => onDelete(property._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
} 