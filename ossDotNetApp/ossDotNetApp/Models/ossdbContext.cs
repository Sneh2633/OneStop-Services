using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ossDotNetApp.Models
{
    public partial class ossdbContext : DbContext
    {
        public ossdbContext()
        {
        }

        public ossdbContext(DbContextOptions<ossdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Area> Areas { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Service> Services { get; set; } = null!;
        public virtual DbSet<ServiceCost> ServiceCosts { get; set; } = null!;
        public virtual DbSet<Specialization> Specializations { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Vendor> Vendors { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=ossdb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Area>(entity =>
            {
                entity.ToTable("areas");

                entity.HasIndex(e => e.CityId, "city_id");

                entity.Property(e => e.AreaId).HasColumnName("area_id");

                entity.Property(e => e.AreaName)
                    .HasMaxLength(30)
                    .HasColumnName("area_name");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Areas)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("areas_ibfk_1");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.ServiceId)
                    .HasName("PRIMARY");

                entity.ToTable("categories");

                entity.HasIndex(e => e.ServiceName, "service_name_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.ServiceId).HasColumnName("service_id");

                entity.Property(e => e.ServiceName)
                    .HasMaxLength(40)
                    .HasColumnName("service_name");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("cities");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.Property(e => e.CityName)
                    .HasMaxLength(30)
                    .HasColumnName("city_name");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("customers");

                entity.HasIndex(e => e.UserId, "user_id")
                    .IsUnique();

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .HasColumnName("address");

                entity.Property(e => e.ContactNumber)
                    .HasMaxLength(10)
                    .HasColumnName("contact_number");

                entity.Property(e => e.Email)
                    .HasMaxLength(55)
                    .HasColumnName("email");

                entity.Property(e => e.Fname)
                    .HasMaxLength(45)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(30)
                    .HasColumnName("lname");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Customer)
                    .HasForeignKey<Customer>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("customers_ibfk_1");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("feedback");

                entity.HasIndex(e => e.CustomerId, "customer_id_idx");

                entity.HasIndex(e => e.VendorId, "vendor_id_idx");

                entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");

                entity.Property(e => e.Comments)
                    .HasMaxLength(150)
                    .HasColumnName("comments");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.VendorId).HasColumnName("vendor_id");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("customer_id");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("vendor_id");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.HasIndex(e => e.CustomerId, "customer_id");

                entity.HasIndex(e => e.ServiceId, "serviceid_idx");

                entity.HasIndex(e => e.VendorId, "vendor_id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.BookingDatetime)
                    .HasColumnType("datetime")
                    .HasColumnName("booking_datetime");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.ServiceId).HasColumnName("service_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.VendorId).HasColumnName("vendor_id");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orders_ibfk_1");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKj7bkj6q0u3681uv3bvq21316i");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.VendorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orders_ibfk_2");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Rid)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Rname)
                    .HasMaxLength(45)
                    .HasColumnName("rname");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.ToTable("services");

                entity.HasIndex(e => e.CategoryId, "category_id_idx");

                entity.HasIndex(e => e.Name, "name_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.ServiceId).HasColumnName("service_id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Services)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("category_id");
            });

            modelBuilder.Entity<ServiceCost>(entity =>
            {
                entity.ToTable("service_cost");

                entity.HasIndex(e => e.ServiceId, "FK8qa5rlwmv4eo0b1y770an9hj6_idx");

                entity.HasIndex(e => e.VendorId, "FKky1mnc8clj80smdweb930s27a");

                entity.Property(e => e.ServiceCostid).HasColumnName("service_costid");

                entity.Property(e => e.Cost).HasColumnName("cost");

                entity.Property(e => e.ServiceId).HasColumnName("service_id");

                entity.Property(e => e.VendorId).HasColumnName("vendor_id");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceCosts)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK8qa5rlwmv4eo0b1y770an9hj6");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.ServiceCosts)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FKky1mnc8clj80smdweb930s27a");
            });

            modelBuilder.Entity<Specialization>(entity =>
            {
                entity.HasKey(e => e.SpId)
                    .HasName("PRIMARY");

                entity.ToTable("specialization");

                entity.Property(e => e.SpId).HasColumnName("sp_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Specialization1)
                    .HasMaxLength(255)
                    .HasColumnName("specialization");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Roleid, "roleid_idx");

                entity.HasIndex(e => e.Username, "username")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Status)
                    .HasColumnType("bit(1)")
                    .HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(55)
                    .HasColumnName("username");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Roleid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("roleid");
            });

            modelBuilder.Entity<Vendor>(entity =>
            {
                entity.ToTable("vendors");

                entity.HasIndex(e => e.Serviceid, "serviceid_idx");

                entity.HasIndex(e => e.UserId, "user_id");

                entity.Property(e => e.VendorId).HasColumnName("vendor_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .HasColumnName("address");

                entity.Property(e => e.ContactNumber)
                    .HasMaxLength(10)
                    .HasColumnName("contact_number");

                entity.Property(e => e.Email)
                    .HasMaxLength(55)
                    .HasColumnName("email");

                entity.Property(e => e.Fname)
                    .HasMaxLength(30)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(45)
                    .HasColumnName("lname");

                entity.Property(e => e.Serviceid).HasColumnName("serviceid");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.Vendors)
                    .HasForeignKey(d => d.Serviceid)
                    .HasConstraintName("serviceid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Vendors)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vendors_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
